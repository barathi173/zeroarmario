import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
//import {ListCategoryComponent} from './list-category/list';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AlertComponent} from '../alert/alert.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categoryForm : FormGroup;
  public submitted: boolean = false;
  public reloadChild :string ;
  constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private router: Router,
		public dialog: MatDialog
	 ) { 
		this.form_validation();
	 }
	  ngOnInit(): void {
		  
	  }
	  form_validation() : void {
		this.categoryForm = this.formBuilder.group({ 
                        category: ['', Validators.required],
						isFeatured: [false],
		});
	}
  get cat(){
    return this.categoryForm.controls;
  }
  openDialog(): void {
   this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Record Added',showBtn: false, showCancel : true  }
    });
  }

  categorySubmit(){
    this.submitted = true;
    console.log(this.categoryForm.controls)
    let category = String(this.categoryForm.value.category).trim();
		let isFeatured = this.categoryForm.value.isFeatured;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('user-token')}`,
  });
		if(this.categoryForm.status !== 'INVALID'){
			this.http.post(`${environment.baseUrl}api/categories/create`,{category,isFeatured} , { headers: httpHeaders }).subscribe((data: any)=>{
          		this.reloadChild = String(Math.random());
				//this.form_validation();
				this.categoryForm.setValue({category: '', isFeatured: false});
				//this.categoryForm.value.categoty.setError(null);
				console.log(this.categoryForm)
				this.submitted = false;
				this.openDialog();
			},err=>{
				this.submitted = false;
			});
		}
  }

}
