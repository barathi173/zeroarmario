import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fieldTextType: boolean;
  public signUpform : any;
  public submitted: boolean = false;
  public errorTxt : string = '';
  constructor(
    //public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
		private http: HttpClient,
		private router: Router
    ) { 
        this.signUpform  = this.formBuilder.group({
          fname: ['',Validators.required],
          lname: ['',Validators.required],
          email: ['',Validators.required],
          password: ['',Validators.required],
          phNO:['',Validators.required],
        });
    }

  ngOnInit(): void {
  }
  get singupFormData(){ return this.signUpform.controls; }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngSubmitfn(){
    //alert('-------------here------------')
    this.submitted = true;
    let email = String(this.signUpform.value.email).trim();
		let password = String(this.signUpform.value.password).trim();
    let fname = String(this.signUpform.value.fname).trim();
    let lname = String(this.signUpform.value.lname).trim();
    let phNO = Number(String(this.signUpform.value.phNO).trim());
		if(this.signUpform.status !== 'INVALID'){
      this.http.post(`${environment.baseUrl}api/users/register`,{email,password,fname,lname, phNO }).subscribe((data: any)=>{
        console.log('-------success-----------', data)
        this.router.navigate(['admin-login']);
    },err=>{
      this.errorTxt = err.error;
      this.submitted = false;
    });
    }
  }

}


