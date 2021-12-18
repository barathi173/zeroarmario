import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AdminsiteComponent} from './adminsite/adminsite.component';
import {AdminRoutingModule} from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
	declarations:[
		AdminsiteComponent,
		//AdminLoginComponent,
		AdminsidebarComponent,
		AdminDashboardComponent,
		
	],
	imports:[
		CommonModule,
		AdminRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports:[
		AdminsiteComponent,
		//AdminLoginComponent,
		AdminsidebarComponent,
		AdminDashboardComponent,
	
		//AdminRoutingModule
	],
	providers:[],
	//bootstrap:[ AdminsiteComponent ]
})

export class AdminModule{
}