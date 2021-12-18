import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/product.model'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore, public http : HttpClient) { }

  getProducts(category:string) {
    if(category=='HOME'){
      return this.firestore.collection('products', ref => ref.limit(4)).snapshotChanges();
    }else if(category=='NULL'){
      return this.firestore.collection('products').snapshotChanges();
    }else{
      return this.firestore.collection('products', ref => ref.where('category', 'array-contains', category)).snapshotChanges();
    }
  }
   getProductById(id :any){
    let options: any={
      headers :{
        authorization : `Bearer ${localStorage.getItem('user-token')}`
      }
    }
  
    return   this.http.get<any>(`${environment.baseUrl}api/products/${id}`,options)
   }
   getProductByCategoryId(id :any){
    let options: any={
      headers :{
        authorization : `Bearer ${localStorage.getItem('user-token')}`
      }
    }
  
    return  this.http.get<any>(`${environment.baseUrl}api/products/get/all`,options)
   }

  getUID(): string{
    return localStorage.getItem("UID")||"";
  }

  setUID(UID: string){
    localStorage.setItem("UID", UID);
  }
}
