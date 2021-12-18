import { Component, OnInit, AfterViewInit, ViewChild, Input, OnChanges } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import _ from 'lodash';
import {PaginationHelper} from '../pagination-helper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AlertComponent} from '../alert/alert.component';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})

export class ListCategoryComponent implements OnInit, AfterViewInit, OnChanges {
  public userToken : string = '';
  public catMsg : string = null;
  public listofcategory: Icategory[] = [];
  public displayedColumns: string[] = ['category', 'isFeatured', '_id'];
  public dataSource : any;
  public paginatorHelper = new PaginationHelper();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() canReload = '';
  public displayData : any = [];
  public totalcount : number = 0;
  public pageSize : number = 10;
  public pageIndex : number = 1;
  public searchTxt : string ='';
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(){
    this.getData();
  }
  constructor(public http: HttpClient, public dialog: MatDialog) {
    this.userToken = localStorage.getItem(`user-token`);
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Icategory>(this.displayData);
    this.getData();
  }
  performSearch($event){
   let searchData = this.paginatorHelper.doSearch($event);
   console.log('-------------------performSearch-------------------',$event,searchData)
   this.displayData = searchData;
   this.totalcount = searchData.length;
  }
  setPage($event){
   // console.log('------------------setPage--------------------->',$event)
    let {pageIndex, pageSize } = $event;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex + 1 ;
    this.displayData =  this.paginatorHelper.nextPage(pageSize, pageIndex+1);
  }

  openDialog(cat_id): void {
    let dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Are You want to delete', showBtn: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
          this.deleteCat(cat_id);
      }
    });
  }

  closeDialog(){
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Category Deleted', showBtn: false, showCancel : true }
    });
  }
  
  getData() : any{
    let options: any={
      headers :{
        authorization : `Bearer ${this.userToken}`
      }
    }
    this.http.get<Icategory>(`${environment.baseUrl}api/categories/`,options).subscribe((data: any)=>{
      this.catMsg = null;
      this.listofcategory = data;
      this.paginatorHelper.dataSource = data
      this.displayData =  this.paginatorHelper.nextPage(this.pageSize, this.pageIndex);
      this.totalcount = data.length;
        
      console.log('=======Rest categories =========>', data);
    },err=>{
      this.catMsg = err;
      console.log('-----------Error------------->',err)
    });
  }

removeCat(cat_id: string){
      //alert(cat_id)
      this.openDialog(cat_id);
  }
 deleteCat(cat_id: string){
  let options: any={
    headers :{
      authorization : `Bearer ${this.userToken}`
    }
  }
      this.http.delete(`${environment.baseUrl}api/categories/${cat_id}`,options).subscribe((data)=>{
           console.log( '----------------Success-----------------', this.listofcategory, data)
           this.listofcategory = this.listofcategory.filter(d=>{
             return d._id !== cat_id;
           });
           this.paginatorHelper.dataSource = this.listofcategory;
            this.displayData =  this.paginatorHelper.nextPage(this.pageSize, this.pageIndex);
           this.closeDialog();
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
