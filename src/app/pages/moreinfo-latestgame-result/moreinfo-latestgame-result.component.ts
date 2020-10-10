import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { MatchService } from 'src/app/dataservice/match.service';
declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-moreinfo-latestgame-result',
  templateUrl: './moreinfo-latestgame-result.component.html',
  styleUrls: ['./moreinfo-latestgame-result.component.css']
})
export class MoreinfoLatestgameResultComponent implements OnInit {
  emptyleaguetable:boolean = false;
  leaguetabledata = [];
  lastmatchresult = {
    match_name:'',
    team_one:'',
    team_one_image:'',
    team_one_goal:'',
    team_two_goal:'',
    team_two:'',
    team_two_image:'',
    match_date:'',
    video_url:''
  }
  constructor(private matsr:MatchService,private router: Router) { 
   let data =  this.matsr.getstoredata();
   if(data == undefined){
     this.router.navigateByUrl('/home');
   }else{
   console.log(data,'lastmatch result');
    this.lastmatchresult.match_name = data.match_name;
    this.lastmatchresult.match_date =  data.match_date;
    this.lastmatchresult.team_one = data.team_one;
    this.lastmatchresult.team_one_goal = data.team_one_goal;
    this.lastmatchresult.team_one_image = data.team_one_image;
    this.lastmatchresult.team_two = data.team_two;
    this.lastmatchresult.team_two_goal = data.team_two_goal;
    this.lastmatchresult.team_two_image = data.team_two_image;
this.lastmatchresult.video_url = data.video_url;
   }
    this.getleaguetabledata();
  }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

  getleaguetabledata(){
    this.matsr.getdata('getleaguetabledata').then(res => {
      if(res['status'] == 'success'){
        let data = res['data'];
        if(data == ''){
          this.emptyleaguetable = true;
        }else{
        data.forEach(lt => {
          let w = Number(lt.mp) - Number(lt.loss);
          this.leaguetabledata.push({team:lt.team,mp:lt.mp,win:lt.win,draw:lt.draw,loss:lt.loss,win_match:w});
        })
      }
      }

    },error => {
      console.log(error);
    })
  }

}
