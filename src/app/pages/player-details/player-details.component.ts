import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TeamService } from 'src/app/dataservice/team.service';
declare global {
  interface Window {
    mainjsEvent: any;
  }
}

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  playerid:any;
  emptyteamplayers:boolean = false;
  playerdata :any;
  teamname:any;
  player_image_api:any;
  constructor(private Activate: ActivatedRoute,private toastr:ToastrService,
    private ngxService: NgxUiLoaderService,private router: Router,private tmsv:TeamService) { 
      this.player_image_api = this.tmsv.getplayerimageAPI();
    this.Activate.queryParams.subscribe(res => {
      this.playerid = res.player_id;
      if(this.playerid == undefined){
        this.router.navigate(['/Home']);
      }else{
    this.tmsv.getdata('getplayer/'+res.player_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'][0];
        if(data == ''){
          this.playerdata = [];
          this.router.navigate(['/Home']);
          // this.emptyteamplayers = true;
        }else{
          this.playerdata = data;
        }
      
      }
    });
  }
    });
  }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

}
