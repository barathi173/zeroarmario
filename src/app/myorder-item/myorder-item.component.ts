import { DOCUMENT, CurrencyPipe } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Order, OrderItem } from "../address.model";
import { AuthenticationService } from "../authentication.service";
import { Cartitem } from "../cartitem";
import { Product } from "../product.model";
import { ProductsService } from "../products.service";
import { Saved } from "../saved";
import { ShiprocketService } from "../shiprocket.service";
@Component({
  selector: 'app-myorder-item',
  templateUrl: './myorder-item.component.html',
  styleUrls: ['./myorder-item.component.css']
})
export class MyorderItemComponent implements OnInit {

  @Input() data!: Order;
  products: Product[] = []
  images: string[] = [];

  price!: number;

  constructor(
    private firestore: AngularFirestore,
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthenticationService,
    private service: ProductsService,
    private router: Router,
    private ship: ShiprocketService
  ) {}

  ngOnInit(): void {
    this.data.order_items.forEach(e => {this.getProduct(e)})

    this.ship.trackOrder(this.data.sid, (uae) => {
      this.track_url = uae;
    })
  }

  async addToCart(p: Product, i: number){
    this.UID = await this.auth.getUID()
    
    if(this.UID){
      this.firestore.collection("users").doc(this.UID).collection("cart").ref.add(
        {
          "pid": p.id,
          "size": this.data.order_items[i].size,  
          "quantity": 1
        }
      ).then((res) => {
        //window.alert("ITEM ADDED")
      })
     
    } else {
      
    }
  }

  track_url: string = "";

  track(){
    if(this.track_url){
      window.location.href = this.track_url;
    }
  }

  orderDetails(){
    this.router.navigate(['placed/' + this.data.doc_id])
  }

  cancel(vr: Product){
    var oc = 0;
    
    if(this.data.order_items.length == 1){
      this.data.cancelled = true;
      this.firestore.collection('orders').doc(this.data.doc_id).update(JSON.parse(JSON.stringify(this.data)))
      this.ship.cancelOrder(this.data)
    } else {
      this.data.order_items.forEach((e, i) => {
        if(e.sku.replace(e.name, '') == vr.id){
          this.data.order_items.splice(i, 1);
          this.data.sub_total = this.data.sub_total - (vr.size[e.size] || vr.price)
          this.data.total_discount = (this.data.sub_total) * (this.data.discount / 100)

          this.data.amount = this.data.sub_total + this.data.shipping_charges - this.data.total_discount;
        }
      })

      this.firestore.collection('orders').doc(this.data.doc_id).update(JSON.parse(JSON.stringify(this.data)))
      this.ship.placeOrder(this.data, (e)=>{})
    }
  }

  async getProduct(oi: OrderItem) {
    var d = await this.firestore.collection('products').doc(oi.sku.replace(oi.name, '')).ref.get();
    var pr = {id: d.id, ...(d.data() as Object)} as Product;
    this.products.push(pr)
    console.log(this.images)

    this.images.push(pr.images[0])

    if(oi.size){
      //this.price = this.product.size[oi.size]
    } else {
      //this.price = this.product.price;
    }
  }

  UID: string = "";
  

  eject(){
    //this.firestore.collection('users').doc(this.UID).collection('cart').doc(this.data.id).ref.delete()
  }

  move() {
    //this.router.navigate(["productdetails/" + this.data]);
    //this.document.location.href = 'https://zeroarmario.web.app/productdetails/' + this.data.id;
  }


  saved: Boolean = false;

}
