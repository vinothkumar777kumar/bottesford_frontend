import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard.component';

// import { DefaultRoutingModule } from './default-routing.module';

// import { DefaultComponent } from './default.component';



@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminDashboardModule { }
