import { DOCUMENT } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Cartitem } from "../cartitem";
import { Product } from "../product.model";
import { ProductsService } from "../products.service";
import { Saved } from "../saved";

@Component({
  selector: "app-checkout-item",
  templateUrl: "./checkout-item.component.html",
  styleUrls: ["./checkout-item.component.css"],
})
export class CheckoutItemComponent implements OnInit {
  @Input() data!: Cartitem;
  product!: Product;

  price!: number;

  constructor(
    private firestore: AngularFirestore,
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthenticationService,
    private service: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSavedState();
    this.getProduct();
  }

  async getProduct() {
    var d = await this.firestore.collection('products').doc(this.data.pid).ref.get();
    this.product = d.data() as Product;

    if(this.data.size){
      this.price = this.product.size[this.data.size]
    } else {
      this.price = this.product.price;
    }
  }

  UID: string = "";
  async initSavedState() {
    await this.firestore.collection("users").doc("9").ref.get();
    this.UID = await this.auth.getUID();
    if (this.UID) {
      var doc = await this.firestore
        .collection("users")
        .doc(this.UID)
        .ref.get();
      this.saved = (doc.data() as Saved).saved!!.includes(this.data.pid);
    }
  }

  eject(){
    this.firestore.collection('users').doc(this.UID).collection('cart').doc(this.data.id).ref.delete()
  }

  move() {
    this.router.navigate(["productdetails/" + this.data.pid]);
    //this.document.location.href = 'https://zeroarmario.web.app/productdetails/' + this.data.id;
  }

  toggleSave() {
    if (this.UID) {
      this.saved = !this.saved;

      this.updateBookmark(this.data.pid);
    } else {
    }

    //
  }

  saved: Boolean = false;

  async updateBookmark(id: string) {
    var doc = await this.firestore.collection("users").doc(this.UID).ref.get();

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
