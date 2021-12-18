import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Cartitem } from '../cartitem';
import { Coupon } from '../coupon';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { Product } from '../product.model';
import { Saved } from '../saved';
import { DOCUMENT, CurrencyPipe } from '@angular/common';
import { AddresspageItemComponent } from '../addresspage-item/addresspage-item.component';
import { Address, Order, OrderItem } from '../address.model';

import { DatePipe } from '@angular/common';
import { ShiprocketService } from '../shiprocket.service';
import { Router } from '@angular/router';
import { RozorpayService } from '../rozorpay.service';


export interface SHip{
  order_id: string;
  shipment_id: string;
}
@Component({
  selector: 'app-addresspage',
  templateUrl: './addresspage.component.html',
  styleUrls: ['./addresspage.component.css']
})
export class AddresspageComponent implements OnInit {
  
  items!: Cartitem[];
  UID: string = "";
  mm: string = "Prepaid";

  address: Address = new Address()

  products!: Product[];

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthenticationService,
    public datepipe: DatePipe,
    private ship: ShiprocketService,
    private router: Router,
    private razor: RozorpayService
  ) {}

  pay(v: MatRadioChange){
    this.mm = v.value
  }
  async deploy(){
    this.firestore.collection('users').doc(this.UID).collection('address').add(JSON.parse(JSON.stringify(this.address)));

    var its = [];

    for (let i = 0; i < this.items.length; i++) {
      
      var ci = this.items[i];
      var pi = this.products[i];
      var or = new OrderItem();
      or.selling_price = pi.size[ci.size] || pi.price
      or.name = pi.name
      or.sku = pi.id + "" + pi.name
      or.units = ci.quantity
      or.size = ci.size

      its.push(or)
    }

    var order = new Order()
    var date = new Date()

    order.order_id = Date.now().toString()

    order.billing_address = this.address.door + " " +this.address.address;
    order.billing_address_2 = this.address.address_2;
    order.billing_city = this.address.city;
    order.billing_country = this.address.country;
    order.billing_customer_name = this.address.customer_name;
    order.billing_email = this.address.email;
    order.billing_last_name = this.address.last_name;
    order.billing_phone = this.address.phone;
    order.billing_pincode = this.address.pincode;
    order.billing_state = this.address.state;
    order.billing_country = "India"
    order.shipping_is_billing = true;

    order.order_date = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm' )
    order.pickup_location = "Archaric"
    order.order_items = its
    order.sub_total = this.sub_total;
    order.total_discount = this.discount;
    order.shipping_charges = this.deliver_fee;

    order.length = 10
    order.breadth = 10
    order.height = 10
    order.weight = 1

    if(this.coupon){
      order.discount = this.coupon.offer;
    } else {
      this.discount = 0;
    }

    order.payment_method = this.mm

    order.comment = this.UID
    if(this.mm == 'Prepaid'){
      this.razor.createRzpayOrder(order, (o) => {
        this.dono(o);
      });
    } else {
      this.dono(order)
    }
    
    
  }

  dono(order: Order){
    order.amount = order.sub_total + order.shipping_charges - order.total_discount;
    this.ship.placeOrder(order, async (e)=>{
      var res = e as SHip;
      var lavda = JSON.parse(JSON.stringify(order))
      lavda['oid'] = res.order_id;
      lavda['sid'] = res.shipment_id;
      lavda['date'] = new Date();
      var ddd = await this.firestore.collection('orders').ref.add(lavda)
      this.router.navigate(['placed/' + ddd.id])
    })
  }

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
            console.log("AAADDDDDREASASS PAGE")
            this.items = data.map((eb) => {
              return {
                id: eb.payload.doc.id,
                ...(eb.payload.doc.data()),
              } as Cartitem;
            });
            this.amounts = [];
            this.products = [];
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
    var pr = {id: d.id,...(d.data() as object)}as Product;

    this.products.push(pr)


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
        window.alert(this.coupon.id + "UIDD"+ this.UID + "CART" + e.id);
        this.firestore.collection('users').doc(this.UID).collection('cart').doc(e.id).ref.update({'coupon': this.coupon.id})
      });
    });
  }

}
