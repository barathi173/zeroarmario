import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
	  selector: 'app-adminlogin',
	  templateUrl: './adminlogin.component.html',
	  styleUrls: ['./adminlogin.component.css']

})
export class AdminLoginComponent implements OnInit{
	public login_form:any;
	public submitted: boolean = false;
	public errorTxt : string = '';
	
	 constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private router: Router
	 ) { 
		this.form_validation();
	 }
	  ngOnInit(): void {
		  
	  }
	  form_validation() : void {
		const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
		this.login_form = this.formBuilder.group({ email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
													pwd: ['', Validators.required],
													//rememberme:['',Validators.required]
		});
	}
	get login() { return this.login_form.controls; }
	onSubmitfn( login_form ): void{
		console.log('----------LOGIN FORM CHECK-----------',login_form.status, login_form.value, login_form)
		this.submitted = true;
		let email = String(login_form.value.email).trim();
		let password = String(login_form.value.pwd).trim();
		if(login_form.status !== 'INVALID'){
			console.log('------------URL CHekc---------->', `${environment.baseUrl}/api/users/login`)
			this.http.post(`${environment.baseUrl}api/users/login`,{email,password}).subscribe((data: any)=>{
					console.log('-------success-----------', data.token)
					localStorage.setItem('user-info', JSON.stringify(data));
					localStorage.setItem('user-token', data.token);
					this.router.navigate(['admin/dashboard']);
			},err=>{
				this.errorTxt = err.error;
				this.submitted = false;
				setTimeout(() => {
					//this.router.navigate(['admin/dashboard']);
				}, 1000);
			});
		}
	}
}