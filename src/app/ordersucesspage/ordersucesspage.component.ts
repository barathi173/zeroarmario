import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatIconModule} from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderItem } from '../address.model';
import { AuthenticationService } from '../authentication.service';
import { Cartitem } from '../cartitem';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-ordersucesspage',
  templateUrl: './ordersucesspage.component.html',
  styleUrls: ['./ordersucesspage.component.css']
})
export class OrdersucesspageComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
     private route: ActivatedRoute,
      private service: ProductsService,
       private auth: AuthenticationService, 
       private router: Router) {}

  OID: string = ""

  items!: Cartitem[];
  UID: string = "";
  mm: string = "Prepaid";

  order!: Order

  products!: Product[];

  ngOnInit(): void {
    this.OID = this.route.snapshot.paramMap.get("oid")||""

    this.firestore.collection('orders').doc(this.OID).ref.get().then(d => {
      this.order = d.data() as Order
      this.products = []
      this.order.order_items.forEach((e) => {
        this.getProduct(e)
      });
    });
  }

  amounts: number[] = [];

  sub_total: number = 0;
  total: number = 0;

  deliver_fee: number = 100
  discount: number = 0


  async getProduct(p: OrderItem) {
    var d = await this.firestore.collection('products').doc(p.sku.replace(p.name, '')).ref.get();
    var pr = {id: d.id,...(d.data() as object)}as Product;

    this.products.push(pr)

    if(this.items.length == this.amounts.length && this.items.length != 0){
      this.calculateT()
    }
  }


  calculateT(){
    this.sub_total = this.order.sub_total
    this.discount = this.order.total_discount;
    this.deliver_fee = this.order.shipping_charges;
    this.total = this.sub_total + this.deliver_fee - this.discount;
  }
}
