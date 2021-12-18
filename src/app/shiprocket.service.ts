import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthenticationService } from "./authentication.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Order } from "./address.model";

@Injectable({
  providedIn: "root",
})
export class ShiprocketService {
  URL: string = "https://apiv2.shiprocket.in/";
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthenticationService,
    private http: HttpClient
  ) {}

  async login() {
    //var header = new HttpHeaders()
    //header.append('Content-Type', 'application/json');
    this.http
      .post<TOKEN>(`https://apiv2.shiprocket.in/v1/external/auth/login`, {
        email: "www.subash88@gmail.com",
        password: "Subash don1",
      })
      .subscribe((e) => {
        //window.alert(e.token)
        localStorage.setItem("TOKEN", e.token);
      });
  }

  async cancelOrder(order: Order) {
    var t = this.getToken();
    //window.alert(t);

    var header = new HttpHeaders({
      Authorization: `Bearer ${t}`,
    });
    //header.append();
    this.http.post(`https://apiv2.shiprocket.in/v1/external/orders/cancel`,
        {'ids': [order.oid]},
        {
          headers: header,
        }
      ).subscribe(e => {
        console.log("CANCEL ORDER ",e)
      })
  }

  async placeOrder(order: Order,call: (name) => void ) {
    var t = this.getToken();
    //window.alert(t);

    var header = new HttpHeaders({
      Authorization: `Bearer ${t}`,
    });
    //header.append();
    this.http.post(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`,
        JSON.parse(JSON.stringify(order)),
        {
          headers: header,
        }
      ).subscribe(e => {
        console.log("PLACE ORDER ", e)
        call(e)
      })
  }

  async trackOrder(oid: string,call: (url) => void ) {
    var t = this.getToken();
    //window.alert(t);
console.log(oid)
    var header = new HttpHeaders({
      Authorization: `Bearer ${t}`,
    });
    //header.append();
    this.http.get(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${oid}`,
        {
          headers: header,
        }
      ).subscribe(e => {
        console.log(e)
        call(e['tracking_data']['track_url'])
      })
  }

  getToken() {
    return localStorage.getItem("TOKEN");
  }
}

interface TOKEN {
  token: string;
}
