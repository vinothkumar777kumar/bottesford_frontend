import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AuthLayoutRoutingModule } from './aythlayout-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { TeamPlayersComponent } from 'src/app/pages/team-players/team-players.component';
import { MyaccountComponent } from 'src/app/pages/myaccount/myaccount.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';







@NgModule({
  declarations: [TeamPlayersComponent,MyaccountComponent,CartComponent],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,RouterModule,NgbModule,ToastrModule.forRoot(),
    AuthLayoutRoutingModule,NgxQRCodeModule
  ]
})
export class AuthlayoutModule { }
