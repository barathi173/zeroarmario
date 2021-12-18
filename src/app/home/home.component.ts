

import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { AngularFirestore } from '@angular/fire/firestore';
import { HomeItem } from '../homeitem.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  products!: Product[];
  images!:string[];
  bigtext!:string;
  small!:string;
  //test
  constructor(private productService: ProductsService,private firestore: AngularFirestore) { }



  ngOnInit(): void {
    this.firestore.collection("static").doc('data').ref.get().then((doc) => {
      this.images=(doc.data() as HomeItem).slider;
      this.bigtext=(doc.data() as HomeItem).big_text;
      this.small=(doc.data() as HomeItem).small_text;
    })


    this.productService.getProducts("HOME").subscribe(data => {
      this.products = data.map(e => {
          console.log(e.payload.doc.data())
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Object)
        } as Product;
       
        
      })
    });
  }
  
  }



