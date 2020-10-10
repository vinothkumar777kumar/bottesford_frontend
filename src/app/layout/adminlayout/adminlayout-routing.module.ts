import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';
import { TeamListComponent } from 'src/app/pages/team-list/team-list.component';
import { PlayersListComponent } from 'src/app/pages/players-list/players-list.component';
import { AddTeamComponent } from 'src/app/pages/add-team/add-team.component';
import { AddPlayersComponent } from 'src/app/pages/add-players/add-players.component';
import { ViewPlayersComponent } from 'src/app/pages/view-players/view-players.component';
import { MatchListComponent } from 'src/app/pages/match-list/match-list.component';
import { AddMatchComponent } from 'src/app/pages/add-match/add-match.component';
import { UsersListComponent } from 'src/app/pages/users-list/users-list.component';
import { TicketBookingListComponent } from 'src/app/pages/ticket-booking-list/ticket-booking-list.component';
import { ViewBookingListComponent } from 'src/app/pages/view-booking-list/view-booking-list.component';
import { SportshallBookingListComponent } from 'src/app/pages/sportshall-booking-list/sportshall-booking-list.component';
import { GamesResultComponent } from 'src/app/pages/games-result/games-result.component';
import { AddGameResultComponent } from 'src/app/pages/add-game-result/add-game-result.component';
import { ManagerDashboardComponent } from 'src/app/pages/manager-dashboard/manager-dashboard.component';
import { ManagerTeamMatchesComponent } from 'src/app/pages/manager-team-matches/manager-team-matches.component';
import { ManagerTeamPlayersComponent } from 'src/app/pages/manager-team-players/manager-team-players.component';
import { BlogListComponent } from 'src/app/pages/blog-list/blog-list.component';
import { AddBlogComponent } from 'src/app/pages/add-blog/add-blog.component';





export const AdminLayoutRoutes: Routes = [
    {
        path: '',children: [
            { path: 'dashboard',component:AdminDashboardComponent},
            { path: 'team-manager-dashboard',component:ManagerDashboardComponent},
            { path: 'team-list',component:TeamListComponent },
            { path: 'players-list',component:PlayersListComponent },
            { path: 'add-team', component:AddTeamComponent },
            { path: 'add-player', component:AddPlayersComponent },
            { path: 'view-players', component:ViewPlayersComponent },
            { path: 'match-list', component:MatchListComponent },
            { path: 'add-match', component:AddMatchComponent },
            { path: 'users-list', component:UsersListComponent },
            { path: 'ticket-booking-list', component:TicketBookingListComponent },
            { path: 'sportshall-booking-list', component:SportshallBookingListComponent},
            { path: 'view-booking-list', component:ViewBookingListComponent},
            { path: 'games-result', component:GamesResultComponent},
            { path: 'add-game-result', component:AddGameResultComponent},
            { path: 'manager-team-players', component:ManagerTeamPlayersComponent},
            { path: 'manager-team-matches', component:ManagerTeamMatchesComponent},
            { path: 'blog-list', component:BlogListComponent},
            { path: 'add-blog', component:AddBlogComponent}
            
        ]
    }
];


