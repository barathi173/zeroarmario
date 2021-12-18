import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { User } from '../user';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  user !: User;
  UID !: string;

  constructor(private auth: AuthenticationService,
     public firestore: AngularFirestore,
     private router: Router) { }

  ngOnInit(): void {
    this.initUser()
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

  

  logout(){
    this.auth.Logout();
  }

}
