import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { BasicFooterComponent } from './basic-footer/basic-footer.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { ToastrModule } from 'ngx-toastr';





// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
// import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [BasicHeaderComponent,BasicFooterComponent, AuthHeaderComponent, 
    // CardComponent
  ],
  imports: [
    CommonModule,RouterModule,ToastrModule
  ],
  exports: [
    BasicHeaderComponent,
    BasicFooterComponent,
    AuthHeaderComponent
  ]
})
export class ComponentModule { }
