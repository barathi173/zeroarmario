import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";


import { NgxImageZoomModule } from "ngx-image-zoom";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { MyordersComponent } from "./myorders/myorders.component";
import { MyaccountComponent } from "./myaccount/myaccount.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductdetailsComponent } from "./productdetails/productdetails.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { TopbarComponent } from "./shared/topbar/topbar.component";
import { ProductlistComponent } from "./productlist/productlist.component";
import { CheckoutItemComponent } from "./checkout-item/checkout-item.component";
import { MyordersListsComponent } from "./myorders-lists/myorders-lists.component";
import { ProductitemComponent } from "./productitem/productitem.component";
import { MatGridListModule } from "@angular/material/grid-list";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { OrdersucesspageComponent } from "./ordersucesspage/ordersucesspage.component";
import { SalestagComponent } from "./salestag/salestag.component";
import { WishlistitemComponent } from "./wishlistitem/wishlistitem.component";
import { AddresspageItemComponent } from "./addresspage-item/addresspage-item.component";
import { AddresspageComponent } from "./addresspage/addresspage.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { DatePipe } from "@angular/common";
import { MyorderItemComponent } from './myorder-item/myorder-item.component';
import { EManageAddressComponent } from './e-manage-address/e-manage-address.component';
import { EEditAddressComponent } from './e-edit-address/e-edit-address.component';
import { EEditProfileComponent } from './e-edit-profile/e-edit-profile.component';
import { ESearchComponent } from './e-search/e-search.component';
import { AdminordersComponent } from './adminorders/adminorders.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
//import { AdminsiteComponent } from './adminsite/adminsite.component';
import { AdmincouponsComponent } from './admincoupons/admincoupons.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { RefundsWorkComponent } from './refunds-work/refunds-work.component';
import { TrackOrderReturnComponent } from './track-order-return/track-order-return.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ReturnPolicyOptionComponent } from './return-policy-option/return-policy-option.component';
import { EAddAddressComponent } from './e-add-address/e-add-address.component';
import { HelpCenterSwitchComponent } from './help-center-switch/help-center-switch.component';
import { MyaccountSwitchComponent } from './myaccount-switch/myaccount-switch.component';
import { ReturnExchangeFormComponent } from './return-exchange-form/return-exchange-form.component';
import { CancellationSubmitComponent } from './cancellation-submit/cancellation-submit.component';
import { ReturnExchangeSubmitComponent } from './return-exchange-submit/return-exchange-submit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

//import {AdminModule} from './admin.module';
//import {AdminRoutingModule} from './admin-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AddProductComponent } from './admin-addproduct/addproduct.component';
import {CategoryComponent} from './category/category.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ListCategoryComponent} from './list-category/list-category.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import {ListSubcategoryComponent} from './list-subcategory/list-subcategory.component';
import{NumberOnlyDirective} from './app-numberonly.directive';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {ListProductComponent} from './adminproducts/list-products.component';
//import {AdminAuthService} from './admin-auth.service';
///import {GetProductService} from './get-product.service';
//import { ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {AlertComponent} from './alert/alert.component';
import {AdminProductlistComponent} from './admin-productlist/admin-productlist.component';
import {calculateDiscount} from './calculate-discount.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    MyordersComponent,
    MyaccountComponent,
    CheckoutComponent,
    ProductdetailsComponent,
    FooterComponent,
    TopbarComponent,
    ProductlistComponent,
    CheckoutItemComponent,
    MyordersListsComponent,
    ProductitemComponent,
    BreadcrumbComponent,
    WishlistComponent,
    WishlistitemComponent,
    OrdersucesspageComponent,
    SalestagComponent,
    AddresspageItemComponent,
    AddresspageComponent,
    MyorderItemComponent,
    EManageAddressComponent,
    EEditAddressComponent,
    EEditProfileComponent,
    ESearchComponent,
    AdminordersComponent,
    AdminproductsComponent,
    AdmincouponsComponent,
    ChangePasswordComponent,
    OrderConfirmationComponent,
    ReturnPolicyComponent,
    RefundsWorkComponent,
    TrackOrderReturnComponent,
    FeedbackComponent,
    FaqComponent,
    AboutUsComponent,
    CareersComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ReturnPolicyOptionComponent,
    EAddAddressComponent,
    HelpCenterSwitchComponent,
    MyaccountSwitchComponent,
    ReturnExchangeFormComponent,
    CancellationSubmitComponent,
    ReturnExchangeSubmitComponent,
    DashboardComponent,
	AdminLoginComponent,
	AdminsidebarComponent,
	AdminDashboardComponent,
  AddProductComponent,
  CategoryComponent,
  SubCategoryComponent,
  ListCategoryComponent,
  ListSubcategoryComponent,
  NumberOnlyDirective,
  AdminHeaderComponent,
  ListProductComponent,
  AlertComponent,
  AdminProductlistComponent,
  calculateDiscount,
  //AdminAuthService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireAuthModule,
    //AngularFireAuth,
    NgxImageZoomModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgbModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule
	//AdminModule,
	//AdminRoutingModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [
    DatePipe,
    calculateDiscount,
    //GetProductService
   ],
  bootstrap: [AppComponent],
})
export class AppModule {}

