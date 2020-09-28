import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BasiclayoutComponent } from './layout/basiclayout/basiclayout.component';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { AdminComponent } from './component/admin/admin.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'',component:BasiclayoutComponent,children:[
    {
      path: '',
      loadChildren: () => import('./layout/basiclayout/basiclayout.module').then(m => m.BasiclayoutModule)
      // loadChildren: './layout/basiclayout/basiclayout.module#BasiclayoutModule'
    }
  ]},

      {
        path: '',
        component: AuthlayoutComponent,
        children:[
          {
            path:'',
            loadChildren: () => import('./layout/authlayout/authlayout.module').then(m => m.AuthlayoutModule)
          }
        ]
      },
      
          {
            path:'admin',
            loadChildren: () => import('./layout/adminauthlayout/adminauthlayout.module').then(m => m.AdminauthlayoutModule)
          },
      {
        path: '',
        component: AdminComponent,
        children: [
      {
        path: '',
        loadChildren: './layout/adminlayout/adminlayout.module#AdminlayoutModule'
        // loadChildren: () => import('./layout/adminlayout/adminlayout.module').then(m => m.AdminlayoutModule)
      }
    ]
  }
  
 
];

@NgModule({
  imports: [CommonModule,BrowserModule,RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule,RouterLink]
})
export class AppRoutingModule { }
