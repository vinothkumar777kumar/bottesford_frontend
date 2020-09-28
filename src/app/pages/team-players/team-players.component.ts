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
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  teamid:any;
  emptyteamplayers:boolean = false;
  teamplayers = [];
  teamname:any;
  player_image_api:any;
  constructor(private Activate: ActivatedRoute,private toastr:ToastrService,
    private ngxService: NgxUiLoaderService,private router: Router,private tmsv:TeamService) { 
      this.player_image_api = this.tmsv.getplayerimageAPI();
    this.Activate.queryParams.subscribe(res => {
      this.teamid = res.team_id;
      if(this.teamid){
        // this.title = "Edit Team";
        // this.submit_action = "Update Team";
      }else{
        // this.title = 'Add Team';
        // this.submit_action = "Add Team";
      }
    this.tmsv.getdata('getteamplayers/'+res.team_id).then(res => {
      if(res['status'] == 'success'){
        let data = res['data'];
        if(data == ''){
          this.teamplayers = [];
          this.emptyteamplayers = true;
        }else{
          this.emptyteamplayers = false;
          this.teamplayers = [];
          data.forEach(p => {
            this.teamplayers.push({id:p.id,team:p.team,player_image:this.player_image_api+''+p.player_image,description:p.description,
              player_name:p.player_name,position:p.position,dateofbirth:p.dateofbirth,signed_date:p.signed_date,
              player_height:p.player_height,country:p.country,team_name:p.team_name,squad_no:p.squad_no})
          })
          // console.log(this.teamplayers);
          this.teamname = this.teamplayers[0].team_name;
        }
      
      }
    });
    });
  }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

  goto_playerdetails(data){
    const navigationExtras = {
      queryParams: {
          player_id: data.id  
      }
  };
this.router.navigate(['/player-details'], navigationExtras);
  }

}
