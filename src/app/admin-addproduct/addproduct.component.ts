import {Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router ,ActivatedRoute} from '@angular/router';
import {AlertService} from '../alert/alert.service'

@Component({
    selector: 'app-addproduct',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./addproduct.component.css']

})

export class AddProductComponent implements OnInit{
	public productform : any;
	public isSubmited : boolean = false;
	public categoryList :Icategory[]= [];
	public subCategoryList :any[]= [];
	public availabeSizeError : string = null;
	public mainimageSrc : any = null;
	public subimageSrc_1 : any = null;
	public subimageSrc_2 : any = null;
	public subimageSrc_3 : any = null;
	@ViewChild('mainImage', { static: false }) mainImage?: ElementRef<any>;
	@ViewChild('subImage1', { static: false }) subImage1 ?: ElementRef<any>;
	@ViewChild('subImage2', { static: false }) subImage2 ?: ElementRef<any>;
	@ViewChild('subImage3', { static: false }) subImage3 ?: ElementRef<any>;
	public descriptionArray =[{title:null, desc:null}];
	public isEdit = false;
	public productId = null;
	public categoryId = null;
    constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private alert : AlertService,
	 ) { 
		this.formValidation();
	 }
	  ngOnInit(): void {
		this.activatedRoute.data.subscribe((response: any) => {
			if(response.product !== undefined){
				this.isEdit = true;
				this.productId = response.product._id;
				this.categoryId = response.product.category;
				console.log(response.product, JSON.parse(response.product.description))
				this.descriptionArray = JSON.parse(response.product.description);
				let options: any={
					headers :{
					  authorization : `Bearer ${localStorage.getItem('user-token')}`
					}
				  }
				this.http.get<any>(`${environment.baseUrl}api/products/productsize/${response.product.productSize}`,options).subscribe((productsize)=>{
					this.formValidation(response.product, productsize);
				});
				this.mainimageSrc = response.product.image;
				this.subimageSrc_1 = response.product.images[0] !== undefined ?  response.product.images[0] : null;
				this.subimageSrc_2 =  response.product.images[1] !== undefined ?  response.product.images[1] : null;
				this.subimageSrc_3 =  response.product.images[2] !== undefined ?  response.product.images[2] : null;
			}
		  });
		  
		 this.getAllCat();
	  }

	  formValidation(defaultData = null, productSize = null){
		this.productform = this.formBuilder.group({
			itemname :[defaultData?.name || '',Validators.required],
			price:[defaultData?.price || '',Validators.required],
			discount:[ defaultData?.discount || ''],
			size_s_bool: [productSize?.s || false],
			size_s_text: [productSize?.sSize || ''],
			size_x_bool:[productSize?.x || false],
			size_x_text:[productSize?.xSize || ''],
			size_m_bool:[productSize?.m || false],
			size_m_text:[productSize?.mSize || ''],
			size_xl_bool:[productSize?.xl || false],
			size_xl_text:[productSize?.xlSize || ''],
			size_l_bool:[productSize?.l || false],
			size_l_text:[productSize?.lSize || ''],
			size_xxl_bool:[productSize?.xxl || false],
			size_xxl_text:[productSize?.xxlSize || ''],
			stocks:[defaultData?.countInStock || '',Validators.required],
			brand:[defaultData?.brand || '',Validators.required],
			category:[defaultData?.category || '',Validators.required],
			subcategory:[defaultData?.subcategory || ''],
			newin :[defaultData?.isNewIn || false],
			onsale :[defaultData?.isOnSale || false],
			featured:[false]
		});
	  }

	  get product(){
		  return this.productform.controls;
	  }
	addDescripton(){
		if(this.descriptionArray.length < 4){
			let obj = {title:null, desc:null};
			this.descriptionArray.push(obj);
		}
	}
	removeRow(i){
		this.descriptionArray = this.descriptionArray.filter((v,index)=>(i != index));
	}
	descriptionData(index, elem, key){
		console.log(index,elem)
		this.descriptionArray[index][key]=elem.value;
	}
	validator(productform : any){
		let {size_s_bool, size_s_text, size_x_bool, size_x_text, size_m_bool, size_m_text,size_xl_bool,size_xl_text, size_l_bool, size_l_text, size_xxl_bool, size_xxl_text } = productform.controls;
		let error: number = 0;
		let errorText = null;
		if(size_s_bool.value &&  size_s_text.value ==='' || size_s_bool.value === false &&  size_s_text.value !=='' ){
			errorText = 'Size S Required';
		}
		if(size_x_bool.value &&  size_x_text.value ===''|| size_x_bool.value === false &&  size_x_text.value !=='' ){
			errorText = 'Size X Required';
		}
		if(size_m_bool.value &&  size_m_text.value ==='' || size_m_bool.value === false &&  size_m_text.value !=='' ){
			errorText = 'Size M Required';
		}
		
		if(size_xl_bool.value &&  size_xl_text.value ==='' || size_xl_bool.value === false &&  size_xl_text.value !=='' ){
			errorText = 'Size XL Required';
		}
		
		if(size_l_bool.value &&  size_l_text.value ==='' || size_l_bool.value === false &&  size_l_text.value !==''){
			errorText = 'Size L Required';
		}
		
		if(size_xxl_bool.value &&  size_xxl_text.value ==='' || size_xxl_bool.value === false &&  size_xxl_text.value !==''  ){
			errorText = 'Size XXL Required';
		}
		
		return errorText;				
	}
	  
  getAllCat(){
    let options: any={
      headers :{
        authorization : `Bearer ${localStorage.getItem('user-token')}`
      }
    }
		this.http.get<Icategory>(`${environment.baseUrl}api/categories/`,options).subscribe((data: any)=>{
			
			this.categoryList = data;
		},err=>{
		
		});
   }
	  addproduct(): any{
		this.isSubmited = true;
		this.availabeSizeError = null;
		this.availabeSizeError = this.validator(this.productform);
		if(this.mainimageSrc === null && !this.isEdit){
			this.alert.openDialog({message: 'Item Image Required',showBtn: false, showCancel : true, icon:''});
			return false;
		}
		console.log('----------Add Product------------>', this.productform, this.availabeSizeError)
		if(this.productform.status === 'VALID' && this.availabeSizeError  === null){
			let name = this.productform.controls.itemname.value;
			let discount = this.productform.controls.discount.value;
			let price = this.productform.controls.price.value;
			let brand = this.productform.controls.brand.value;
			let category = this.productform.controls.category.value;
			let subcategory = this.productform.controls.subcategory.value;
			let countInStock = this.productform.controls.stocks.value;
			let isNewIn = this.productform.controls.newin.value;
			let isOnSale = this.productform.controls.onsale.value;
			let featured =  this.productform.controls.featured.value;
			const httpHeaders: HttpHeaders = new HttpHeaders({
				Authorization: `Bearer ${localStorage.getItem('user-token')}`,
			});
			let formData = new FormData();
			//formData.append('file', this.mainImage.nativeElement?.files[0]);
			if(this.mainImage.nativeElement?.files[0] !== undefined){
				formData.append('image', this.mainImage.nativeElement?.files[0]);
			}
			if(this.subImage1.nativeElement.files[0] !== undefined){
				formData.append('subimage', this.subImage1.nativeElement.files[0]);	
			}
			if(this.subImage2.nativeElement.files[0] !== undefined){
				formData.append('subimage', this.subImage2.nativeElement.files[0]);
			}
			if(this.subImage3.nativeElement.files[0] !== undefined){
				formData.append('subimage', this.subImage3.nativeElement.files[0]);
			}	
			formData.append('name', name);
			formData.append('discount', discount);
			formData.append('price', price);
			formData.append('brand', brand);
			formData.append('category', category);
			formData.append('subcategory', subcategory);
			formData.append('countInStock', countInStock);
			formData.append('isNewIn', isNewIn);
			formData.append('isOnSale', isOnSale);
			formData.append('size_s_bool', this.productform.controls.size_s_bool.value);
			formData.append('size_s_text', this.productform.controls.size_s_text.value);
			formData.append('size_x_bool', this.productform.controls.size_x_bool.value);
			formData.append('size_x_text', this.productform.controls.size_x_text.value);
			formData.append('size_m_bool', this.productform.controls.size_m_bool.value);
			formData.append('size_m_text', this.productform.controls.size_m_text.value);
			formData.append('size_xl_bool', this.productform.controls.size_xl_bool.value);
			formData.append('size_xl_text', this.productform.controls.size_xl_text.value);
			formData.append('size_l_bool', this.productform.controls.size_l_bool.value);
			formData.append('size_l_text', this.productform.controls.size_l_text.value);
			formData.append('size_xxl_bool', this.productform.controls.size_xxl_bool.value);
			formData.append('size_xxl_text', this.productform.controls.size_xxl_text.value);
			formData.append('description_block', JSON.stringify(this.descriptionArray));
			if(this.isEdit){
				this.http.put(`${environment.baseUrl}api/products/${this.productId}`,formData , { headers: httpHeaders }).subscribe((data: any)=>{
					if(data.productSize !== undefined){
						this.http.put(`${environment.baseUrl}api/products/productsize/${data.productSize}`,formData , { headers: httpHeaders }).subscribe((data: any)=>{
							this.alert.openDialog({message: 'Item Updated',showBtn: false, showCancel : true, icon:''});
						});
					}
					
					//this.router.navigate(['admin/category/product']);
				},err=>{
					this.isSubmited = false;
				});
	
			}else{
				this.http.post(`${environment.baseUrl}api/products/create`,formData , { headers: httpHeaders }).subscribe((data: any)=>{
					this.isSubmited = false;
					this.formValidation();
					this.mainimageSrc = null;
					this.subimageSrc_1 = null;
					this.subimageSrc_2 = null;
					this.subimageSrc_3 = null;
					this.descriptionArray = [{title:null, desc:null}];
					this.alert.openDialog({message: 'Item Added',showBtn: false, showCancel : true, icon:''});
				},err=>{
					this.isSubmited = false;
				});
	
			}
			
		}
		
		  
	  }
	 
	  deleteProduct(){
		let options: any={
			headers :{
			  authorization : `Bearer ${localStorage.getItem('user-token')}`
			}
		  }
			this.http.delete<any>(`${environment.baseUrl}api/products/${this.productId}`,options).subscribe((data: any)=>{
				this.router.navigate([`admin/category/product/${this.categoryId}`]);
			},err=>{
			
		});
	  }
	  removeImg(type: any): void{
		switch(type){
			case 1:
				this.subimageSrc_1 = null;
				break;
			case 2:
				this.subimageSrc_2 = null;
				break;
			case 3:
				this.subimageSrc_3 = null;
				break;
		   default:
				this.mainimageSrc = null;
			   break;
		}
	  }

	  readURL(event: any, type: any): void {
		if (event.target?.files && event.target.files[0]) {
			const file = event.target.files[0];
	
			const reader = new FileReader();
			reader.onload = e =>{
				switch(type){
					case 1:
						this.subimageSrc_1 = reader.result;
						break;
					case 2:
						this.subimageSrc_2 = reader.result;
						break;
					case 3:
						this.subimageSrc_3 = reader.result;
						break;
                   default:
						this.mainimageSrc = reader.result;
					   break;
				}
			} 
			reader.readAsDataURL(file);
		}	
	}
	getSubCategory(event : any): void{
		let cat_id = event.value;
		this.getSubCat(cat_id);
	}

	getSubCat(cat_id){
		let options: any={
		  headers :{
			authorization : `Bearer ${localStorage.getItem('user-token')}`
		  }
		}
		this.http.get<Icategory>(`${environment.baseUrl}api/subcategories/category/${cat_id}`,options).subscribe((data: any)=>{
				this.subCategoryList = data;
		},err=>{
			this.subCategoryList = [];
		});
	}
	goBack(){
		this.router.navigate(['/admin/product']);
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