import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { GamesComponent } from 'src/app/pages/games/games.component';
import { BlogComponent } from 'src/app/pages/blog/blog.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { HallDetailComponent } from 'src/app/pages/hall-detail/hall-detail.component';
import { TeamPlayersComponent } from 'src/app/pages/team-players/team-players.component';
import { PlayerDetailsComponent } from 'src/app/pages/player-details/player-details.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { BuyticketsComponent } from 'src/app/pages/buytickets/buytickets.component';
import { SportsHallBookingComponent } from 'src/app/pages/sports-hall-booking/sports-hall-booking.component';
import { MoreinfoLatestgameResultComponent } from 'src/app/pages/moreinfo-latestgame-result/moreinfo-latestgame-result.component';
import { BlogSingleComponent } from 'src/app/pages/blog-single/blog-single.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';


const BasicLayoutRoutes: Routes = [
    { path: 'home',component:HomeComponent},
    { path: 'about', component: AboutComponent },
    { path: 'match', component: GamesComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'buyticket', component: BuyticketsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'hall-detail', component: HallDetailComponent },
    { path: 'team-players', component: TeamPlayersComponent },
    { path: 'player-details', component: PlayerDetailsComponent },
    { path: 'sports-hall-booking', component: SportsHallBookingComponent },
    { path: 'moreinfo-latestgame-result', component: MoreinfoLatestgameResultComponent },
    { path: 'blog-single', component: BlogSingleComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(BasicLayoutRoutes)],
    exports: [RouterModule]
  })
  export class BasicLayoutRoutingModule { }

