import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/dataservice/team.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  userscount:number = 0;
  teamscount:number = 0;
  upcommingmatchcount:number = 0;
  todaybookingticketcount:number = 0;
  logininfo:any;
  playersdata:any;
  playerscount = 0;
playedmatch = 0;
winmatch = 0;
sessionstorage = [];
mySubscription: any;
  constructor(private toastr: ToastrService,private tmsv:TeamService,private router:Router) { 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    setTimeout(() => {
      this.getplayers_data(this.logininfo['user_id']);
    },2000);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
  }

  getplayers_data(user_id){
    this.tmsv.getusersdata('getdashboardcount/'+user_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'][0];
    console.log(data);
    if(data == ''){
this.playerscount = 0;
this.playedmatch = 0;
this.winmatch = 0;
    }else{
      localStorage.setItem('team_id',data.team_id);
      if ( data.totalplayer != null) { this.playerscount = data.totalplayer; }
      if ( data.playedmatch != null) { this.playedmatch = data.playedmatch; }
      if ( data.winmatch != null) { this.winmatch = data.winmatch; }
     
     
    }
            }
    },error => {
      console.log(error);
     if(error['error']){
      this.toastr.error(error['error'].message, 'Error', {
        progressBar:true
      });
      return;
     }
     
    })
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

}
