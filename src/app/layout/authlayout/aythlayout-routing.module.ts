import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyaccountComponent } from 'src/app/pages/myaccount/myaccount.component';
import { BlogComponent } from 'src/app/pages/blog/blog.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { GamesComponent } from 'src/app/pages/games/games.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { BuyticketsComponent } from 'src/app/pages/buytickets/buytickets.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { AuthlayoutComponent } from './authlayout.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HallDetailComponent } from 'src/app/pages/hall-detail/hall-detail.component';
import { TeamPlayersComponent } from 'src/app/pages/team-players/team-players.component';
import { PlayerDetailsComponent } from 'src/app/pages/player-details/player-details.component';





const AuthLayoutRoutes: Routes = [
            { path: 'home', component:HomeComponent
              },
            { path: 'myaccount', component: MyaccountComponent },
            { path: 'about', component: AboutComponent },
            { path: 'games', component: GamesComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'buyticket', component: BuyticketsComponent },
            { path: 'cart', component: CartComponent },
            { path: 'hall-detail', component: HallDetailComponent },
            { path: 'team-players', component: TeamPlayersComponent},
            { path: 'player-details', component: PlayerDetailsComponent },
        
    
];
@NgModule({
    imports: [RouterModule.forChild(AuthLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AuthLayoutRoutingModule { }

