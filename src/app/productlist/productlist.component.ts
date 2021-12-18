import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/products.service";
import { Product } from "src/app/product.model";

import { ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "@angular/fire/firestore";
import { HomeItem } from "../homeitem.model";
import { $ } from "protractor";

@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"],
})
export class ProductlistComponent implements OnInit {
  products!: Product[];
  docs!: QueryDocumentSnapshot<unknown>[];
  dic!: QueryDocumentSnapshot<unknown>[];

  current: number = 1;

  more: Boolean = true;

  recom: Boolean = false;

  pages: number[] = [1, 2];

  limit: number = 10;

  title!: string;
  category!: string;

  sizes: string[] = ['S','M','L','X','XL','XXL'];
  ss: string[] = [];

  colors: string[] = [];
  sc: string[] = [];

  offers: string[] = [];
  so: string[] = [];

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get("title")!!;
    this.category = this.route.snapshot.paramMap.get("cat")!!;
    this.firestore.collection('static').doc('data').ref.get().then((d) => {
      this.colors =(d.data() as HomeItem).colors
      this.offers =(d.data() as HomeItem).offers
    });
    this.getData();

  }

  async getData() {
    var q = this.firestore.collection("products").ref;

    if (this.category != "NULL") {
      q.where("category", "array-contains", this.category);
    }

    if(this.ss.length != 0){
      //q.where("avail", 'array-contains-any', this.ss);
    }
    

    var idx = this.limit * (this.current - 1) - 1;
    if (idx < 0) {
      idx = 0;
    }
    

    if (this.docs && idx != 0) {
      var after = this.docs[idx];
      //window.alert(idx);
      var d = await q.orderBy("name").limit(this.limit).startAfter(after).get();
      d.docs.forEach((e) => {
        this.docs.push(e);
      });
      this.dic = d.docs;
    } else {
      var d = await q.orderBy("name").limit(this.limit).get();
      this.docs = d.docs;
      this.dic = d.docs;
    }

    if(this.dic.length < this.limit){
      this.more = false
      if(this.current == 1){
        this.pages.splice(1, 1);
      }
    } else {
      this.more = true
    }

    this.products = this.dic.map((e) => {
      console.log(e.data());
      return {
        id: e.id,
        ...(e.data() as Object),
      } as Product;
    });
  }

  addOffer(s){
    if(this.so.includes(s)){
      this.removeOffer(s)
    } else {
      this.so.push(s);
    }
    this.getData()
  }

  toggleRec(){
    this.recom = !this.recom
    this.getData()
  }

  removeOffer(s){
    var idx = this.so.indexOf(s)
    this.so.splice(idx, 1);
  }

  addColor(s){
    if(this.sc.includes(s)){
      this.removeColor(s)
    } else {
      this.sc.push(s);
    }
    this.getData()
  }

  removeColor(s){
    var idx = this.sc.indexOf(s)
    this.sc.splice(idx, 1);
  }

  addSize(s){
    if(this.ss.includes(s)){
      this.removeSize(s)
    } else {
      this.ss.push(s);
    }
    this.getData()
  }

  removeSize(s){
    var idx = this.ss.indexOf(s)
    this.ss.splice(idx, 1);
  }

  moveTo(pageNumber) {
    this.current = pageNumber;
    if (pageNumber < 4) {
      this.pages.splice(3, this.pages.length - 2);
    }

    this.getData();
  }

  next() {
    if (this.current == this.pages.length) {
      this.addMore();
    } else {
      this.moveTo(this.current + 1);
    }
  }

  addMore() {
    if (this.more) {
      var e = this.pages[this.pages.length - 1];
      this.pages.push(e + 1);
      this.moveTo(this.pages[this.pages.length - 1]);
    } 
  }

  filterSlideUp() {
    const el = document.getElementById('productlist-mobile');
    el.style.transform = "translateY(0%)";
  }

  filterSlideDown() {
    const el = document.getElementById('productlist-mobile');
    el.style.transform = "translateY(150%)";
  }

    

}


// images:e.payload.doc.data().images,
// category:e.payload.doc.data().category,
// price:e.payload.doc.data().price,
