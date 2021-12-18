import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { User } from '../user';


@Component({
  selector: 'app-e-manage-address',
  templateUrl: './e-manage-address.component.html',
  styleUrls: ['./e-manage-address.component.css']
})
export class EManageAddressComponent implements OnInit {

  user !: User;
  UID !: string;
  address : string;
  aid: string = "kLkFluWCTCMxjxr0ZLda";

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  toggle(x:any){
    if(x == 1){
      document.getElementById("selected1").style.borderColor = "green";
      document.getElementById("selected2").style.borderColor = "grey"
    }else{
      document.getElementById("selected2").style.borderColor = "green";
      document.getElementById("selected1").style.borderColor = "grey";
    }
  }

  ngOnInit(): void {
    this.initUser()
    this.getAddress()
  }

  async initUser(){
    await this.firestore.collection('users').ref.limit(1).get();
    this.UID = await this.auth.getUID();
    console.log("UAE", this.UID)
   if(this.UID){
     var doc = await this.firestore.collection('users').doc(this.UID).ref.get();
     this.user = doc.data() as User;
   } else {
     this.router.navigate(['signin'])
   }
 }

 async getAddress(){
  var address = this.firestore.collection('users').doc(this.UID).collection('address').doc(this.aid).ref.get();

 }
  

 logout(){
  this.auth.Logout();
}



  
}
