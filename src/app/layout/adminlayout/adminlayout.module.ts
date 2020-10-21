import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './adminlayout-routing.module';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TeamListComponent } from 'src/app/pages/team-list/team-list.component';
import { PlayersListComponent } from 'src/app/pages/players-list/players-list.component';
import { AddTeamComponent } from 'src/app/pages/add-team/add-team.component';
import { AddPlayersComponent } from 'src/app/pages/add-players/add-players.component';
import { ViewPlayersComponent } from 'src/app/pages/view-players/view-players.component';
import { MatchListComponent } from 'src/app/pages/match-list/match-list.component';
import { AddMatchComponent } from 'src/app/pages/add-match/add-match.component';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from 'src/app/pages/users-list/users-list.component';
import { TicketBookingListComponent } from 'src/app/pages/ticket-booking-list/ticket-booking-list.component';
import { SportshallBookingListComponent } from 'src/app/pages/sportshall-booking-list/sportshall-booking-list.component';
import { ViewBookingListComponent } from 'src/app/pages/view-booking-list/view-booking-list.component';
import { GamesResultComponent } from 'src/app/pages/games-result/games-result.component';
import { AddGameResultComponent } from 'src/app/pages/add-game-result/add-game-result.component';
import { ManagerDashboardComponent } from 'src/app/pages/manager-dashboard/manager-dashboard.component';
import { ManagerTeamMatchesComponent } from 'src/app/pages/manager-team-matches/manager-team-matches.component';
import { ManagerTeamPlayersComponent } from 'src/app/pages/manager-team-players/manager-team-players.component';
import { BlogListComponent } from 'src/app/pages/blog-list/blog-list.component';
import { AddBlogComponent } from 'src/app/pages/add-blog/add-blog.component';
import { MatchScheduleComponent } from 'src/app/pages/match-schedule/match-schedule.component';
import { MatchScheduleDetailsComponent } from 'src/app/pages/match-schedule-details/match-schedule-details.component';
import { DataTablesModule } from 'angular-datatables';
import { ManagerAddteamPlayersComponent } from 'src/app/pages/manager-addteam-players/manager-addteam-players.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';




@NgModule({
  declarations: [AdminDashboardComponent,TeamListComponent,PlayersListComponent,AddTeamComponent,
    AddPlayersComponent,ViewPlayersComponent,MatchListComponent,AddMatchComponent,UsersListComponent,
    TicketBookingListComponent,SportshallBookingListComponent,ViewBookingListComponent,GamesResultComponent,
    AddGameResultComponent,ManagerDashboardComponent,ManagerTeamMatchesComponent,ManagerTeamPlayersComponent,
    BlogListComponent,AddBlogComponent,MatchScheduleComponent,MatchScheduleDetailsComponent,ManagerAddteamPlayersComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    SharedModule,AngularMyDatePickerModule,DataTablesModule
  ]
})
export class AdminlayoutModule { }
