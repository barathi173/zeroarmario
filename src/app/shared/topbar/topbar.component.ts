import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "@angular/fire/firestore";
import { HomeItem } from "src/app/homeitem.model";
import { Category } from "src/app/shared/topbar/category.model";
import { ProductsService } from "src/app/products.service";
import { Navigator } from "src/app/navigator";
import { AuthenticationService } from "src/app/authentication.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.css"],
})
export class TopbarComponent implements OnInit {
  cart_count: Number = 0;
  logo!: string;
  toptext!: string;
  topwears!: string;
  bottomwears!: string;
  stationary!: string;
  prevScrollpos: any

  //mentop!:string[];

  men!: Navigator;
  women!: Navigator;
  children!: Navigator;

  current!: Navigator;

  constructor(
    private firestore: AngularFirestore,
    private service: ProductsService,
    private auth: AuthenticationService
  ) {}

  setCurrent(s: any){
    switch (s) {
      case "Men":
        this.current = this.men;
        break;
      case "Women":
        this.current = this.women;
        break;
      case "Children":
        this.current = this.children;
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    
    this.logo = localStorage.getItem('LOGO')
    this.firestore
      .collection("static")
      .doc("data")
      .ref.get()
      .then((doc) => {
        this.logo = (doc.data() as HomeItem).logo;
        localStorage.setItem('LOGO', this.logo);
        this.toptext = (doc.data() as HomeItem).top_text;
        console.log(doc.data());
        this.auth.getUID().then((uu) => {
          console.log("UIII", uu)
          this.firestore
            .collection("users")
            .doc(uu)//'SC6XLQ8i04ynJ5YYOsp5')//this.service.getUID())
            .collection("cart")
            .snapshotChanges()
            .subscribe((data) => {
              this.cart_count = data.map((e) => e)?.length ?? 0;
              console.log('CART: ',uu, this.cart_count)
            });
        })
      });

    this.firestore
      .collection("navigation")
      .ref.get()
      .then((docs) => {
        docs.docs.forEach((e) => {
          switch (e.id) {
            case "Men":
              this.men = e.data() as Navigator;
              break;
            case "Women":
              this.women = e.data() as Navigator;
              break;
            case "Children":
              this.children = e.data() as Navigator;
              break;
            default:
              break;
          }
          this.current = this.men;
        });
      });

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    document.getElementById("topbar").style.top = "0";
    document.getElementById("search").style.top = "10vh";
  } else {
    document.getElementById("navbar").style.top = "-20vh";
    document.getElementById("topbar").style.top = "-20vh";
    document.getElementById("search").style.top = "0";
  }
  prevScrollpos = currentScrollPos;
}
      
    
  }

  async listenCart(){
    var uu = await this.auth.getUID();
    console.log("UIII", uu)
    this.firestore
      .collection("users")
      .doc(uu)//'SC6XLQ8i04ynJ5YYOsp5')//this.service.getUID())
      .collection("cart")
      .snapshotChanges()
      .subscribe((data) => {
        
        this.cart_count = data.map((e) => e)?.length ?? 0;

        console.log('CART: ',uu, this.cart_count)
      });
  }

  profileOpen() {
    document.getElementById('menu-women-mob').style.display = 'none';
    document.getElementById('menu-men-mob').style.display = 'none';
    document.getElementById('menu-children-mob').style.display = 'none';
    document.getElementById('menu-home-mob').style.display = 'none';
    document.getElementById('menu-support-mob').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('link-account').style.display = 'block';
    document.getElementById('link-wishlist').style.display = 'block';
  }

  profileClose() {
    document.getElementById('menu-women-mob').style.display = 'block';
    document.getElementById('menu-men-mob').style.display = 'block';
    document.getElementById('menu-children-mob').style.display = 'block';
    document.getElementById('menu-home-mob').style.display = 'block';
    document.getElementById('menu-support-mob').style.display = 'block';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('link-account').style.display = 'none';
    document.getElementById('link-wishlist').style.display = 'none';
  }
}
