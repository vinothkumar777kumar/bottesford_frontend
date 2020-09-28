import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { AdminLoginComponent } from 'src/app/pages/admin-login/admin-login.component';


 const AdminAuthLayoutRoutes: Routes = [
    
            { path: '', component:AdminLoginComponent }
        
    
];

@NgModule({
    imports: [RouterModule.forChild(AdminAuthLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AdminAuthlayoutRoutingModule { }
