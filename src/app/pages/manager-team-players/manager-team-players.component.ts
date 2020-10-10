import { Component, OnInit,Input } from '@angular/core';
import { TeamService } from 'src/app/dataservice/team.service';

@Component({
  selector: 'app-manager-team-players',
  templateUrl: './manager-team-players.component.html',
  styleUrls: ['./manager-team-players.component.css']
})
export class ManagerTeamPlayersComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  logininfo:any;
  emptyteamplayers:boolean = false;
  teamplayers = [];
  constructor(private tmsv:TeamService) { 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.getteam_players(this.logininfo['user_id']);
  }

  ngOnInit(): void {
  }

  getteam_players(user_id){
    this.tmsv.getdata('getmanagerteamplayers/'+user_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'];
        if(data == ''){
this.emptyteamplayers = true;
        }else{
          data.forEach(p => {
            this.teamplayers.push({id:p.id,team:p.team,player_image:p.player_image,description:p.description,
              player_name:p.player_name,position:p.position,dateofbirth:p.dateofbirth,signed_date:p.signed_date,
              player_height:p.player_height,country:p.country,team_name:p.team_name,squad_no:p.squad_no});
          })
          // this.teamname = this.teamplayers[0].team_name;
        }
      }
    });
  }

}
