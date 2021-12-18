import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Days } from '../days';
import { ProductsService } from '../products.service';
import { getuid } from 'process';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  product!: Product;
  product2!: Product;
  currentimage!: string;
  deliverytime!:string;
  deliveryfee!:string;
  returntime!:string;
  price!: Number;
  liked!: Product[];
  pid: string = "E4ugSgKIdkpPFNXnJNhw"
  UID: string = "";
  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private service: ProductsService, private auth: AuthenticationService, private router: Router) {}
  ngOnInit(): void {
    this.getuid();
    this.pid = this.route.snapshot.paramMap.get("animal")!!
    this.firestore.collection('products').doc(this.pid).ref.get().then((doc): void => {
      this.product = {
        id: doc.id,
        ...(doc.data() as Object)
      } as Product;
      this.product2 = this.product
      this.currentimage = this.product.images[0]
      this.price = this.product.price
    })
    this.getstaticdata()
    this.firestore.collection('products').ref.limit(4).get().then((doc) => {
      this.liked = doc.docs.map(e => {
        return {
          id: e.id,
          ...(e.data() as Object)
        } as Product;
      })
    })
  }
  async getuid(){
    this.UID = await this.auth.getUID()
  }
  size: string = "";
  async addToCart(){
    this.UID = await this.auth.getUID()
    //window.alert(this.UID)
    if(this.UID){
      this.firestore.collection("users").doc(this.UID).collection("cart").ref.add(
        {
          "pid": this.product.id,
          "size": this.size,
          "quantity": 1
        }
      ).then((res) => {
        //window.alert("ITEM ADDED")
      });
    }
     else{
      this.router.navigate(["signin"]);
    }
  }
  async getstaticdata() {
    var datas = await this.firestore.collection('static').doc('data').ref.get()
    var d = datas.data() as Days;
    this.deliverytime = d.delivery_days!!
    this.deliveryfee = d.delivery_fee!!
    this.returntime = d.return_days !!
  }
  setImage(u: string){
    this.currentimage = u
  }
  setSize(s){
    if(s == ''){
      this.price = this.product.price
    } else {
      this.price = this.product.size[s]
    }
    this.size = s;
  }
  status: boolean = false
  sizeToggle(e:any) {
    this.status = !this.status;
  }

  showSize() {
    const el = document.getElementById('size-chart');
    el.style.display = "block";
  }

  closeSize() {
    const el = document.getElementById('size-chart');
    el.style.display = "none";
  }
}