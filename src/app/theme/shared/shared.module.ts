import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {DataFilterPipe} from './components/data-table/data-filter.pipe';
// import {TodoListRemoveDirective} from './components/todo/todo-list-remove.directive';
// import {TodoCardCompleteDirective} from './components/todo/todo-card-complete.directive';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng-click-outside';
// import {SpinnerComponent} from './components/spinner/spinner.component';

import 'hammerjs';
import 'mousetrap';
import {GalleryModule} from '@ks89/angular-modal-gallery';
import { CardModule } from 'src/app/component/card/card.module';
import { BreadcrumbModule } from 'src/app/component/breadcrumb/breadcrumb.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
  declarations: [
    // DataFilterPipe,
    // TodoListRemoveDirective,
    // TodoCardCompleteDirective,
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    // AlertModule,
    CardModule,
    BreadcrumbModule,
    // ModalModule,
    GalleryModule.forRoot(),
    ClickOutsideModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    // AlertModule,
    CardModule,
    BreadcrumbModule,
    // ModalModule,
    GalleryModule,
    // DataFilterPipe,
    // TodoListRemoveDirective,
    // TodoCardCompleteDirective,
    ClickOutsideModule,
    // SpinnerComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
