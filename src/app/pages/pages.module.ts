import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HallDetailComponent } from './hall-detail/hall-detail.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddPlayersComponent } from './add-players/add-players.component';
import { TeamListComponent } from './team-list/team-list.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { ViewPlayersComponent } from './view-players/view-players.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { MatchListComponent } from './match-list/match-list.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { SportsHallBookingComponent } from './sports-hall-booking/sports-hall-booking.component';
import { UsersListComponent } from './users-list/users-list.component';
import { TicketBookingListComponent } from './ticket-booking-list/ticket-booking-list.component';
import { SportshallBookingListComponent } from './sportshall-booking-list/sportshall-booking-list.component';
import { ViewBookingListComponent } from './view-booking-list/view-booking-list.component';
import { GamesResultComponent } from './games-result/games-result.component';
import { AddGameResultComponent } from './add-game-result/add-game-result.component';
import { MoreinfoLatestgameResultComponent } from './moreinfo-latestgame-result/moreinfo-latestgame-result.component';
import { ManagerSignUpComponent } from './manager-sign-up/manager-sign-up.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerTeamPlayersComponent } from './manager-team-players/manager-team-players.component';
import { ManagerTeamMatchesComponent } from './manager-team-matches/manager-team-matches.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ViewSingleBlogComponent } from './view-single-blog/view-single-blog.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';



@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent, HallDetailComponent, AddTeamComponent, AddPlayersComponent, TeamListComponent, PlayersListComponent, ViewPlayersComponent, TeamPlayersComponent, PlayerDetailsComponent, MatchListComponent, AddMatchComponent, SportsHallBookingComponent, UsersListComponent, TicketBookingListComponent, SportshallBookingListComponent, ViewBookingListComponent, GamesResultComponent, AddGameResultComponent, MoreinfoLatestgameResultComponent, ManagerSignUpComponent, ManagerDashboardComponent, ManagerTeamPlayersComponent, ManagerTeamMatchesComponent, BlogListComponent, AddBlogComponent, ViewSingleBlogComponent, BlogSingleComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
