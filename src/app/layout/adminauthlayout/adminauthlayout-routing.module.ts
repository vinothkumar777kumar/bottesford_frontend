import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { AdminLoginComponent } from 'src/app/pages/admin-login/admin-login.component';
import { ManagerSignUpComponent } from 'src/app/pages/manager-sign-up/manager-sign-up.component';


 const AdminAuthLayoutRoutes: Routes = [
    
            { path: '', component:AdminLoginComponent },
            { path: 'sign-up', component:ManagerSignUpComponent },
        
    
];

@NgModule({
    imports: [RouterModule.forChild(AdminAuthLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AdminAuthlayoutRoutingModule { }
