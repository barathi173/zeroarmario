import { Component, OnInit, Input, Inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Product } from "src/app/product.model";
import {MatGridListModule} from '@angular/material/grid-list';
import { DOCUMENT, CurrencyPipe } from '@angular/common';
import { Saved } from "../saved";
import { ProductsService } from "../products.service";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-productitem",
  templateUrl: "./productitem.component.html",
  styleUrls: ["./productitem.component.css"],
})
export class ProductitemComponent implements OnInit {


  UID!: string
  @Input() data!: Product;
  saved: Boolean = false;

  constructor(private firestore: AngularFirestore, 
    @Inject(DOCUMENT) private document: Document,
     private auth: AuthenticationService,
      private service: ProductsService,
      private router: Router) {}

  ngOnInit(): void {
    this.initSavedState()
  }

  async initSavedState(){
    await this.firestore.collection('users').doc("9").ref.get()
    this.UID = await this.auth.getUID()
    if(this.UID){
      var doc = await this.firestore
      .collection("users")
      .doc(this.UID).ref
      .get()
    this.saved = (doc.data() as Saved).saved!!.includes(this.data.id)
    } 
  }

  move(){
    this.router.navigate(['productdetails/'+this.data.id])
  }


  toggleSave() {

    if(this.UID){
      this.saved = !this.saved;

    this.updateBookmark(this.data.id);
    }else {
      this.router.navigate(['signin'])
    }
    

    //
  }

  async updateBookmark(id: string) {
    var doc = await this.firestore
      .collection("users")
      .doc(this.UID).ref.get()

      let saved = (doc.data() as Saved).saved!!;
      //var saved: String[] = doc.data().saved;
      if (this.saved) {
        saved.push(id);
      } else {
        saved.forEach((element: string, index: any) => {
          if (element == id) saved.splice(index, 1);
        });
      }

      this.firestore
        .collection("users")
        .doc(this.UID)
        .set({ saved: saved }, { merge: true });
  }
}
