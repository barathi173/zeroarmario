import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AlertComponent} from '../alert/alert.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
 public subcategoryForm ;
 public submitted: boolean = false;
 public reloadChild : string = '';
 public categoryList : Icategory[] = [];
  constructor(
    private formBuilder: FormBuilder,
		private http: HttpClient,
		private router: Router,
    public dialog: MatDialog
  ) { 
    this.form_validation();
  }

  ngOnInit(): void {
    this.getAllCat();
  }

  form_validation() : void {
		this.subcategoryForm = this.formBuilder.group({ 
              category: ['', Validators.required],
              subcategory: ['', Validators.required],
              isFeatured: [false],
		});
  }
  get subcat(){
    return this.subcategoryForm.controls;
  }

  subcategorySubmit(){
    this.submitted = true;
    console.log(this.subcategoryForm.controls)
    let category = String(this.subcategoryForm.value.category).trim();
		let isFeatured = this.subcategoryForm.value.isFeatured;
    let subCate =  String(this.subcategoryForm.value.subcategory).trim();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('user-token')}`,
  });
		if(this.subcategoryForm.status !== 'INVALID'){
			this.http.post(`${environment.baseUrl}api/subcategories/create`,{category,isFeatured,subCate} , { headers: httpHeaders }).subscribe((data: any)=>{
        this.subcategoryForm.setValue({category: '', subcategory:'', isFeatured: false});
          this.reloadChild = String(Math.random());
          this.openDialog();
			},err=>{
				this.submitted = false;
			});
		}
  }

  openDialog(): void {
    this.dialog.open(AlertComponent, {
       width: '250px',
       data: { message: 'Record Added',showBtn: false, showCancel : true  }
     });
   }

  getAllCat(){
    //alert(cat_id)
    let options: any={
      headers :{
        authorization : `Bearer ${localStorage.getItem('user-token')}`
      }
    }
        this.http.get<Icategory>(`${environment.baseUrl}api/categories/`,options).subscribe((data: any)=>{
             console.log( '----------------Success-test----------------',  data)
             this.categoryList = data;
        },err=>{
          console.log('-----------Error------------->',err)
        });
}


}


export interface Icategory{
  category: string,
  createdAt ?:string,
  isFeatured: boolean,
  updatedAt ?: string,
  user?: string,
  __v ?: number,
  _id?: string,
}