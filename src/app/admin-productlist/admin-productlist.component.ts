import { PortalModule } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-productlist',
  templateUrl: './admin-productlist.component.html',
  styleUrls: ['./admin-productlist.component.css']
})
export class AdminProductlistComponent implements OnInit {
  public productList = [];
  public saved = false;
  public categoryDetail = null;
  public productDropDownCat =[];
  public productDropDownDetail =[];
  constructor(
    private router: Router,
		private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.data.subscribe((response: any) => {
      this.productList = response.productList.filter((data)=>{
        return ( data.category !== null && (data.category._id !==undefined && data.category._id === id))
      });
      this.categoryDetail = this.productList[0] !== undefined ? this.productList[0].category : null;
      this.productList.forEach((data)=>{
        if(data.subcategory === null){ return; }
          if( this.productDropDownCat.indexOf(data.subcategory._id) !== -1 ){
            let arrayindex = this.productDropDownCat.indexOf(data.subcategory._id);
            this.productDropDownDetail[arrayindex].count += 1;
          }else{
            this.productDropDownCat.push(data.subcategory._id);
            this.productDropDownDetail.push({
              category : data.category.category,
              subcategory : data.subcategory.subCate,
              subcategoryId : data.subcategory._id,
              categoryId : data.category._id,
              count : 1
            });
          }
      });
      console.log( this.productDropDownCat, this.productDropDownDetail )

    });
  }
  toggleSave(){}
  move(product){
    console.log(product)
    this.router.navigate([`admin/edit-product/${product._id}`]);
  }
}
