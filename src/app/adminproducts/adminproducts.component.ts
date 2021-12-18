import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import  {calculateDiscount} from '../calculate-discount.pipe';
@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css'],
  providers:[calculateDiscount]
})
export class AdminproductsComponent implements OnInit {
  public categoryCountData: any = [];
  public categoryName:any = [];
  public totalCategoryCount: number = 0;
  public productimage : any = [];
  constructor(
    private http: HttpClient,
		private router: Router
  ) { }

  getAllCategoryCount(){
    let options: any={
      headers :{
        authorization : `Bearer ${localStorage.getItem('user-token')}`
      }
    }
    let productimage = [];
    this.http.get<any>(`${environment.baseUrl}api/products/get/product/count`,options).subscribe((data: any)=>{
        
          for(let prop in data.productCount){
            if(prop === 'totalProducts'){
              this.totalCategoryCount = data.productCount['totalProducts'];
            }else{
              let obj = {};
              obj[prop] = data.productCount[prop];
              this.categoryCountData.push(obj);
              this.categoryName.push(prop);
            }
          }
          for(let cat in data.productData){
            let image = data.productData[cat].image
            productimage.push({ cat, image ,cat_id:data.productData[cat].cat_id });
          }
          this.productimage = productimage;
          console.log( '----------------Success-test---categoryCountData-------------',  this.categoryCountData, productimage)
         
    },err=>{
      console.log('-----------Error------------->',err)
    });
  }

  ngOnInit(): void {
    this.getAllCategoryCount();
  }
  navigateTo(category_id){
    this.router.navigate([`admin/category/product/${category_id}`]);
  }

}
