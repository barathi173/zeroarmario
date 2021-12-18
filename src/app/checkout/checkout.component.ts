import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Cartitem } from '../cartitem';
import { Coupon } from '../coupon';
import { Product } from '../product.model';
import { Saved } from '../saved';
import { DOCUMENT, CurrencyPipe } from '@angular/common';

// import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items!: Cartitem[];
  UID: string = "";
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.firestore.collection('users').ref.limit(1).get().then(e => {
      this.auth.getUID().then((uu) => {
        this.UID = uu;
        this.firestore
          .collection("users")
          .doc(uu)
          .collection("cart")
          .snapshotChanges()
          .subscribe((data) => {
            this.items = data.map((eb) => {
              return {
                id: eb.payload.doc.id,
                ...(eb.payload.doc.data()),
              } as Cartitem;
            });
            this.amounts = [];
            this.items.forEach((p) => {
              this.getProduct(p);
            });
          });
      })
    })
  }

  amounts: number[] = [];

  sub_total: number = 0;
  total: number = 0;

  deliver_fee: number = 100
  discount: number = 0


  async getProduct(p: Cartitem) {
    var d = await this.firestore.collection('products').doc(p.pid).ref.get();
    var pr = d.data() as Product;

    if(p.size){
      this.amounts.push(pr.size[p.size])
    } else {
      this.amounts.push(pr.price)
    }

    if(this.items.length == this.amounts.length && this.items.length != 0){
      if(this.items[0].coupon){
        var cc = await this.firestore.collection('coupon').doc(this.items[0].coupon).ref.get();
        this.coupon = {
          id: cc.id,
          ...(cc.data() as object),
        } as Coupon;
        this.invalid = false;
        var o = (this.coupon.expire as any).toDate() as Date
        //console.log( typeof(o), o , o.getTime(), Date.now())
        if(o.getTime() < Date.now()){
          //window.alert('EXPIRED')
          this.expired = true;
          this.coupon = null;
        } else {
          this.expired = false;
        }
      }
      
      this.calculateT()
    }
  }


  calculateT(){
    this.sub_total = 0
    this.amounts.forEach((e) => {
      this.sub_total = this.sub_total + e
    })
    if(this.coupon){
      this.discount = this.sub_total * (this.coupon.offer / 100);
    } else {
      this.discount = 0;
    }
    this.total = this.sub_total + this.deliver_fee - this.discount;
  }

  coupon: Coupon;
  expired: boolean = false;
  invalid: boolean = false;

  couponie(c: string){
    this.coupon = null;
    this.firestore.collection('coupon').ref.where('code', '==', c.toUpperCase()).limit(1).get().then((d) => {
      if(d.docs.length == 1){
        this.coupon = {
          id: d.docs[0].id,
          ...(d.docs[0].data() as object),
        } as Coupon;
        this.invalid = false;
        var o = (this.coupon.expire as any).toDate() as Date
        //console.log( typeof(o), o , o.getTime(), Date.now())
        if(o.getTime() < Date.now()){
          //window.alert('EXPIRED')
          this.expired = true;
          this.coupon = null;
        } else {
          this.expired = false;
        }
      } else {
        this.invalid = true;
      }
      this.calculateT()

      this.items.forEach((e) => {
        //window.alert(this.coupon.id + "UIDD"+ this.UID + "CART" + e.id);
        this.firestore.collection('users').doc(this.UID).collection('cart').doc(e.id).ref.update({'coupon': this.coupon.id})
      });
    });
  }

  deploy(){

  }
}
