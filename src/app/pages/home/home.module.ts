import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'ngx-owl-carousel'; 
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,HomeRoutingModule,OwlModule,NgbModule
  ]
})
export class HomeModule { }
