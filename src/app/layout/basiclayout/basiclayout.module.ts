import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicLayoutRoutingModule } from './basiclayout-routing.module';
import { RouterModule } from '@angular/router';
import { GamesComponent } from 'src/app/pages/games/games.component';
import { BlogComponent } from 'src/app/pages/blog/blog.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { HallDetailComponent } from 'src/app/pages/hall-detail/hall-detail.component';
import { BuyticketsComponent } from 'src/app/pages/buytickets/buytickets.component';
import { SportsHallBookingComponent } from 'src/app/pages/sports-hall-booking/sports-hall-booking.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { MoreinfoLatestgameResultComponent } from 'src/app/pages/moreinfo-latestgame-result/moreinfo-latestgame-result.component';
import { BlogSingleComponent } from 'src/app/pages/blog-single/blog-single.component';
import { PlayerDetailsComponent } from 'src/app/pages/player-details/player-details.component';





@NgModule({
  declarations: [LoginComponent,RegisterComponent,ForgotPasswordComponent,
    GamesComponent,BlogComponent,ContactComponent,HallDetailComponent,
    BuyticketsComponent,SportsHallBookingComponent,MoreinfoLatestgameResultComponent,BlogSingleComponent,PlayerDetailsComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    BasicLayoutRoutingModule,
    ToastrModule.forRoot(),
    NgbModule,RouterModule,AngularMyDatePickerModule
  ]
})
export class BasiclayoutModule { }
