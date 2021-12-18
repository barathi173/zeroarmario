import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth, public service: ProductsService, public firestore: AngularFirestore, public router: Router
  ) { 
  }

  // Sign up with email/password
  SignUp(email, password, name) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been successfully Registered");
        
        
        this.firestore.collection('users').doc(result.user.uid).set({
          'name': name,
          'mail': email,
          'password': password
        });

        this.router.navigate(['/']);

      }).catch((error) => {
        window.alert(error.message)
      })
  }

  changePassword(email){
    return this.afAuth.sendPasswordResetEmail(email).then((res) => {
      window.alert("Password Reset Link has been Sent to Your Email Address.");
    }).catch((error) => {
        window.alert(error.message)
      });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  Logout(){
    return this.afAuth.signOut()
      .then((result) => {
        this.router.navigate(['/']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async getUID(){
    var u = await this.afAuth.currentUser
    return u.uid;
  }

}
