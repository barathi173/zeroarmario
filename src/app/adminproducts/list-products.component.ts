import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-listproducts',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductComponent implements OnInit{
    public products : string = null;
    public displayedColumns: string[] = ['image','name','category', 'brand', 'price', 'countInStock','createdAt', '_id'];
    public listofproduct : any[] = [];
    public deleteProductNameAlt = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public dataSource: any;
    constructor(public http : HttpClient,public router: Router){

    }
    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<any>(this.listofproduct);
        this.getAllProduct();
    }
   
    getAllProduct(): void{
        let options: any={
            headers :{
              authorization : `Bearer ${localStorage.getItem('user-token')}`
            }
          }
          this.http.get<any>(`${environment.baseUrl}api/products/get/all`,options).subscribe((data: any)=>{
        
                this.listofproduct = data;
          });
    }

    removeProduct( product_id: any, product_name: string): void{
      let options: any={
        headers :{
          authorization : `Bearer ${localStorage.getItem('user-token')}`
        }
      }
      if( confirm('Do you Want to delete the Product') ){
        this.http.delete<any>(`${environment.baseUrl}api/products/${product_id}`,options).subscribe((data: any)=>{
            this.ngOnInit();
            this.deleteProductNameAlt = product_name.charAt(0).toUpperCase()+product_name.slice(1,product_name.length);
            setTimeout(()=>{
              this.deleteProductNameAlt = null;
            },1000);
        });
      }
      
    }

    ediProduct( product_id: any, product_name: string): void{
      console.log( '-------------product_id-----------', product_id )
      this.router.navigate([`admin/edit-product/${product_id}`]);
    }
}