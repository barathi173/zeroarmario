import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})


export class AdminDashboardComponent implements OnInit {
  public userToken : string = '';
  public userOrder : any ;
  public noOrderMsg : string = null;
  constructor( public http: HttpClient) { 
    this.userToken = localStorage.getItem(`user-token`);
  }

  ngOnInit(): void {
    this.onInitExecution()
  }

  onInitExecution(){
  let data : IuserData = {
    user : {
      _id: "61928187ef9d9504ca73d25e"
    }
  }
  let options: any={
    //params: JSON.stringify(data),
    headers :{
      authorization : `Bearer ${this.userToken}`
    }
  }
      this.http.get(`${environment.baseUrl}api/orders/user/orders`,options).subscribe((data)=>{
        this.noOrderMsg = null;
        console.log('=======Rest=========>', data);
      },err=>{
        this.noOrderMsg = err.error;
        console.log('-----------Error------------->',err)
      });
  }

}

interface  IData  {
  _id: string
}
interface  IuserData  {
  user:IData
}
