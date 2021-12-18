import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {HomeComponent} from '../app/home/home.component';
import {ProductlistComponent} from '../app/productlist/productlist.component';
import {ProductdetailsComponent} from '../app/productdetails/productdetails.component';
import {CheckoutComponent} from '../app/checkout/checkout.component';
import {CheckoutItemComponent} from '../app/checkout-item/checkout-item.component';
import {MyordersComponent} from '../app/myorders/myorders.component';
import {MyordersListsComponent} from '../app/myorders-lists/myorders-lists.component';
import {MyaccountComponent} from '../app/myaccount/myaccount.component';
import {SigninComponent} from '../app/auth/signin/signin.component';
import {SignupComponent} from '../app/auth/signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersucesspageComponent } from './ordersucesspage/ordersucesspage.component';
import { AddresspageComponent } from './addresspage/addresspage.component';
import { EManageAddressComponent } from './e-manage-address/e-manage-address.component';
import { EEditAddressComponent } from './e-edit-address/e-edit-address.component';
import { EEditProfileComponent } from './e-edit-profile/e-edit-profile.component';
import { ESearchComponent } from './e-search/e-search.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { RefundsWorkComponent } from './refunds-work/refunds-work.component';
import { TrackOrderReturnComponent } from './track-order-return/track-order-return.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ReturnPolicyOptionComponent } from './return-policy-option/return-policy-option.component';
import { EAddAddressComponent } from './e-add-address/e-add-address.component';
import { HelpCenterSwitchComponent } from './help-center-switch/help-center-switch.component';
import { MyaccountSwitchComponent } from './myaccount-switch/myaccount-switch.component';
import { ReturnExchangeFormComponent } from './return-exchange-form/return-exchange-form.component';
import { CancellationSubmitComponent } from './cancellation-submit/cancellation-submit.component';
import { ReturnExchangeSubmitComponent } from './return-exchange-submit/return-exchange-submit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import {ProfileComponent} from './profile/profile.component';

//Admin Routing

import { AdminLoginComponent } from './adminlogin/adminlogin.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import {AdminordersComponent} from './adminorders/adminorders.component';
import {AdmincouponsComponent} from './admincoupons/admincoupons.component';
import {AdminproductsComponent} from './adminproducts/adminproducts.component';
import {AddProductComponent} from './admin-addproduct/addproduct.component';
import {CategoryComponent} from './category/category.component';
import{SubCategoryComponent} from './sub-category/sub-category.component';
import { AdminAuthService } from './admin-auth.service';
import {AdminAuthLoginService} from './admin-authlogin.service';
import {ListProductComponent} from './adminproducts/list-products.component';
import {GetProductService} from './get-product.service';
import {AdminsiteComponent} from './adminsite/adminsite.component';
import {AdminProductlistComponent} from './admin-productlist/admin-productlist.component';
import {AllProductService} from './all-product-service';
export const routes: Routes = [
//{  path:'admin', loadChildren: () => import('./admin.module').then(admin => admin.AdminModule ) },
  { path: '', component: HomeComponent  },
   //{path: 'admin/login', component: AdminLoginComponent }, //--------------> Not working
  {path: 'admin-login', component: AdminLoginComponent , canActivate: [AdminAuthLoginService] }, //==============> working
   {path: 'admin', component: AdminsidebarComponent ,canActivate: [AdminAuthService],children:[
     {path:'add-product', component: AddProductComponent},
	   {path: 'dashboard', component:AdminDashboardComponent},
	   {path: 'orders', component: AdminordersComponent},
	   {path: 'coupons', component: AdmincouponsComponent},
	   {path: 'product', component: AdminproductsComponent},
     {path:'category', component: CategoryComponent},
     {path:'subcategory', component: SubCategoryComponent},
     {path: 'list-product', component: ListProductComponent},
     {path:'edit-product/:id', component: AddProductComponent, resolve:{product: GetProductService}},
     {path:'site', component: AdminsiteComponent},
     {path:'category/:name/:id', component: AdminProductlistComponent, resolve:{productList: AllProductService}},
     {path:'', component:AdminDashboardComponent},
   ] },
  { path: 'productlists/:cat/:title',           component: ProductlistComponent },
  { path: 'productdetails/:animal',          component: ProductdetailsComponent },
  { path: 'checkout',           component: CheckoutComponent },
  { path: 'myorders',  component: MyordersListsComponent },
  { path: 'myaccount',  component: MyaccountComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'signin',  component: SigninComponent },
  { path: 'wishlist',  component: WishlistComponent },
  { path: 'placed/:oid',  component: OrdersucesspageComponent },
  { path: 'address',  component: AddresspageComponent },
  { path: 'search',  component: ESearchComponent },
  { path: 'manageaddress',  component: EManageAddressComponent },
  { path: 'editaddress',  component: EEditAddressComponent },
  { path: 'editprofile',  component: EEditProfileComponent },
  { path: 'adminsidebar', component:AdminsidebarComponent},
  { path: 'changepassword', component:ChangePasswordComponent},
  { path: 'orderconfirmation', component:OrderConfirmationComponent},
  { path: 'myorders1', component:MyordersComponent},
  {path: 'privacypolicy', component:PrivacyPolicyComponent },
  { path: 'termsandconditions', component:TermsAndConditionsComponent},
  { path: 'return-policy', component:ReturnPolicyComponent},
  {path: 'refunds-work', component:RefundsWorkComponent},
  {path:'track-order-return',component:TrackOrderReturnComponent},
  {path: 'feedback',component:FeedbackComponent},
  {path:'faq', component:FaqComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'return-policy-option', component:ReturnPolicyOptionComponent },
  {path: 'addaddress', component: EAddAddressComponent},
  {path:'helpcenter-switch', component:HelpCenterSwitchComponent},
  {path: 'myaccount-switch', component:MyaccountSwitchComponent},
  {path: 'return-exchange-form', component:ReturnExchangeFormComponent},
  {path: 'cancel-submit', component:CancellationSubmitComponent},
  {path: 'return-exchange-submit', component:ReturnExchangeSubmitComponent},
  { path: 'dashboard', component:DashboardComponent },
  //{ path:'profile',component:ProfileComponent},
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[],
})
export class AppRoutingModule {}
