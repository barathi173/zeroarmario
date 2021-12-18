import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "./address.model";
import { WindowRefService } from "./window-ref.service";

@Injectable({
  providedIn: "root",
})
export class RozorpayService {
  constructor(private winRef: WindowRefService, private http: HttpClient) {}

  ngOnInit() {}

  createRzpayOrder(data: Order,call: (order) => void) {
    console.log(data);

    //https://us-central1-zeroarmario.cloudfunctions.net/paymentApi/

    // call api to create order_id
    //this.payWithRazor(data);

    var header = new HttpHeaders({});
    //header.append();
    this.http
      .post(`https://us-central1-zeroarmario.cloudfunctions.net/paymentApi`, {
        amount: Math.round(
          (data.sub_total + data.shipping_charges - data.total_discount) * 100
        ),
        oid: data.order_id,
      })
      .subscribe((e: any) => {
        console.log("Payment ", e);
        const options: any = {
          key: "rzp_test_lwjCmkonOQAC4Q",
          amount: e.amount, 
          currency: "INR",
          name: "", 
          description: "", 
          image: "../../assets/images/png/zeroarmario.png", 
          order_id: e.id,
          modal: {
            escape: false,
          },
          notes: {},
          theme: {
            color: "#0c238a",
          },
        };
        options.handler = (response: any, error) => {
          options.response = response;
          console.log(response);
          console.log(options);
          this.http.post(
            `https://us-central1-zeroarmario.cloudfunctions.net/paymentApi/confirmPayment`,
            response
          ).subscribe((e: any) => {
            if(e.status == "PAYMENT SUCCESSFULL"){
              data.razorpay_order_id = response.razorpay_order_id
              data.razorpay_payment_id = response.razorpay_payment_id
              call(data);
            }
          });
        };
        options.modal.ondismiss = () => {
          console.log("Transaction cancelled.");
        };
        const rzp = new this.winRef.nativeWindow.Razorpay(options);
        rzp.open();
      });
  }

  payWithRazor(order: Order, e: any) {}
}
