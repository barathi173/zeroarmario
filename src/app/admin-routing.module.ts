import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
//import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes:Routes=[
	{path:'/admin-dashboard',component:AdminDashboardComponent},
	
	
	
]

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  AdminRoutingModule { 
constructor(){
		//alert('--------Admin Routing-------');
}

}