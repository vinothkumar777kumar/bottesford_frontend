import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { BasiclayoutModule } from './layout/basiclayout/basiclayout.module';
import { BasiclayoutComponent } from './layout/basiclayout/basiclayout.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { AuthlayoutModule } from './layout/authlayout/authlayout.module';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { AdminauthlayoutComponent } from './layout/adminauthlayout/adminauthlayout.component';
import { NavContentComponent } from './component/admin/navigation/nav-content/nav-content.component';
import { NavItemComponent } from './component/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavCollapseComponent } from './component/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './component/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavigationComponent } from './component/admin/navigation/navigation.component';
import { NavLogoComponent } from './component/admin/navigation/nav-logo/nav-logo.component';
import { NavBarComponent } from './component/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './component/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './component/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './component/admin/configuration/configuration.component';
import { AdminComponent } from './component/admin/admin.component';
import { SharedModule } from './theme/shared/shared.module';
import { NavigationItem } from './component/admin/navigation/navigation';
import { OwlModule } from 'ngx-owl-carousel'; 
import { NgbDropdownModule, NgbButtonsModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminauthlayoutModule } from './layout/adminauthlayout/adminauthlayout.module';
import { AdminlayoutModule } from './layout/adminlayout/adminlayout.module';
import { ManagerNavigationItem } from './component/admin/navigation/manager-navigation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
// import { SharedModule } from './theme/shared/shared.module';



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 3 // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    BasiclayoutComponent,AuthlayoutComponent, AdminauthlayoutComponent,NavContentComponent,NavItemComponent,
    NavCollapseComponent,NavGroupComponent,NavigationComponent,NavLogoComponent,NavItemComponent,NavBarComponent,
    NavLeftComponent,NavRightComponent,ConfigurationComponent,AdminComponent,AboutComponent,HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    BasiclayoutModule,
    AuthlayoutModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SharedModule,
    OwlModule,
    NgbDropdownModule,NgbButtonsModule,NgbTabsetModule,NgbTooltipModule,
    AdminauthlayoutModule,
    AdminlayoutModule,
    BrowserAnimationsModule
  ],
  providers: [Location,{provide:LocationStrategy,useClass:PathLocationStrategy},NavigationItem,ManagerNavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
