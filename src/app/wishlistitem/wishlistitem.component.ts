import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Saved } from '../saved';

@Component({
  selector: 'app-wishlistitem',
  templateUrl: './wishlistitem.component.html',
  styleUrls: ['./wishlistitem.component.css']
})
export class WishlistitemComponent implements OnInit {
  @Input() pid!: string;
  data!: Product;
  constructor(private firestore: AngularFirestore, private service: ProductsService, private auth: AuthenticationService) {}

  UID: string=  "";

  ngOnInit(): void {
    this.firestore.collection('products').doc(this.pid).ref.get().then((d) =>{
      this.data = {
        id: d.id,
        ...(d.data() as Object),
      } as Product;
    })
  }

  async addToCart(){
    this.UID = await this.auth.getUID()
    //window.alert(this.UID)
    
    if(this.UID){
      //window.alert("INCOMING")
      this.firestore.collection("users").doc(this.UID).collection("cart").ref.add(
        {
          "pid": this.data.id,
          "size": this.data.size[0] || '',
          "quantity": 1
        }
      ).then((res) => {
        //window.alert("ITEM ADDED")
      })
     
    } else {
      
    }
  }

  async delete(id: string) {
    this.UID = await this.auth.getUID()
    
    var doc = await this.firestore
      .collection("users")
      .doc(this.UID).ref.get()

      let saved = (doc.data() as Saved).saved!!;
      //var saved: String[] = doc.data().saved;
      saved.forEach((element: string, index: any) => {
        if (element == id) saved.splice(index, 1);
      });

      this.firestore
        .collection("users")
        .doc(this.UID)
        .set({ saved: saved }, { merge: true });
  }

}
