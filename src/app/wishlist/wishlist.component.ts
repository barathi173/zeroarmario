import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { AngularFirestore } from "@angular/fire/firestore";
import { ProductsService } from "../products.service";
import { Saved } from '../saved';
import { AuthenticationService } from '../authentication.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  UID: string = "SC6XLQ8i04ynJ5YYOsp5"
  
  saved:string[]
  constructor(private firestore: AngularFirestore,
    private service: ProductsService,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    //this.UID = this.service.getUID()
    this.initSavedState()
  }
  async initSavedState(){
    await this.firestore.collection('users').doc("9").ref.get()
    this.UID = await this.auth.getUID()
    if(this.UID.length != 0){
      this.firestore
      .collection("users")
      .doc(this.UID).snapshotChanges().subscribe((d) => {
        this.saved = (d.payload.data() as Saved).saved
      })
      
    }
  }

  

}
