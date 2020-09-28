import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import { TeamService } from 'src/app/dataservice/team.service';
import * as moment from 'moment';

declare const AmCharts: any;
declare var $: any;

// import '../../../../assets/charts/amchart/amcharts.js';
// import '../../../../assets/charts/amchart/gauge.js';
// import '../../../../assets/charts/amchart/serial.js';
// import '../../../../assets/charts/amchart/light.js';
// import '../../../../assets/charts/amchart/pie.min.js';
// import '../../../../assets/charts/amchart/ammap.min.js';
// import '../../../../assets/charts/amchart/usaLow.js';
// import '../../../../assets/charts/amchart/radar.js';
// import '../../../../assets/charts/amchart/worldLow.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
userscount:number = 0;
teamscount:number = 0;
upcommingmatchcount:number = 0;
todaybookingticketcount:number = 0;
usersdata = [];
teamsarray = [];
matchdata = [];
todayticketbookingdata = [];
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService,private tmsv:TeamService) {
    setTimeout(() => {
      this.getusers_data();
      },1000);
    setTimeout(() => {
      this.getteams_data();
    },1000);
    setTimeout(() => {
      this.getmatch_data();
    },2000);
    setTimeout(() => {
      this.gettodayticketbooking_data();
    },1000);
   }

  ngOnInit() {
   
  }

  getusers_data(){
    this.tmsv.getusersdata('users').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.userscount = 0;
    }else{
      data.forEach(u => {
        this.usersdata.push({id:u.id,address_one:u.address_one,email:u.email,
          mobile:u.mobile,name:u.name,postcode:u.postcode,status:u.status,town:u.town});
      })
      this.userscount = this.usersdata.length;
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

  getteams_data(){
    this.tmsv.getdata('getteams').then(res => {
      
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.teamscount = 0;
    }else{
      data.forEach(t => {
        this.teamsarray.push({id:t.id,team_name:t.team_name,status:t.status});
      })
      this.teamscount = this.teamsarray.length;
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

  getmatch_data(){
    this.tmsv.getdata('getallmatch').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.upcommingmatchcount = 0;
    }else{
      data.forEach(m => {
        let cd = moment().format('YYYY-MM-DD');
        let sd = moment(m.match_date,'DD-MM-YYYY').format('YYYY-MM-DD');
        if(moment(sd).isAfter(cd) == true){
        this.matchdata.push({id:m.id,team_one:m.team_one,team_two:m.team_two,match_name:m.match_name,round:m.round,match_date:m.match_date,});
        }
      })
      this.upcommingmatchcount = this.matchdata.length;
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

  gettodayticketbooking_data(){
    this.tmsv.getdata('todaybookingtickets').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.upcommingmatchcount = 0;
    }else{
      data.forEach(t => {
        this.todayticketbookingdata.push({id:t.id,match_id:t.match_id,match_type:t.match_type,matchdate:t.matchdate,
          team_one:t.team_one,team_two:t.team_two});
      })
      this.todaybookingticketcount = this.todayticketbookingdata.length;
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
    
}
