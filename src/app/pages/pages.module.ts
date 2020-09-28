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



@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent, HallDetailComponent, AddTeamComponent, AddPlayersComponent, TeamListComponent, PlayersListComponent, ViewPlayersComponent, TeamPlayersComponent, PlayerDetailsComponent, MatchListComponent, AddMatchComponent, SportsHallBookingComponent, UsersListComponent, TicketBookingListComponent, SportshallBookingListComponent, ViewBookingListComponent, GamesResultComponent, AddGameResultComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
