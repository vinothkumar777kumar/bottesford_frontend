import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OwlModule } from 'ngx-owl-carousel'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AdminLoginComponent } from 'src/app/pages/admin-login/admin-login.component';
import { AdminAuthlayoutRoutingModule } from './adminauthlayout-routing.module';



@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,AdminAuthlayoutRoutingModule,FormsModule,ReactiveFormsModule,
    NgbModule
  ]
})
export class AdminauthlayoutModule { }