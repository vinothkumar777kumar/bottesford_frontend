import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/dataservice/team.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.css']
})
export class ViewPlayersComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  teamid:any;
  emptyteamplayers:boolean = false;
  teamplayers = [];
  teamname:string;
  constructor(private Activate: ActivatedRoute,private toastr: ToastrService,private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,private router: Router,private tmsv:TeamService) {
      this.Activate.queryParams.subscribe(res => {
        this.teamid = res.team_id;
      this.tmsv.getdata('getteamplayers/'+res.team_id).then(res => {
        console.log(res);
        if(res['status'] == 'success'){
          let data = res['data'];
          if(data == ''){
this.emptyteamplayers = true;
          }else{
            data.forEach(p => {
              this.teamplayers.push({id:p.id,team:p.team,player_image:p.player_image,description:p.description,
                player_name:p.player_name,position:p.position,dateofbirth:p.dateofbirth,signed_date:p.signed_date,
                player_height:p.player_height,country:p.country,team_name:p.team_name})
            })
            this.teamname = this.teamplayers[0].team_name;
          }
        }
      });
      });
    
   }

  ngOnInit(): void {
  }

  edit_players(data){
    const navigationExtras = {
      queryParams: {
          player_id: data.id  
      }
  };
this.router.navigate(['add-player'], navigationExtras);
  }

  delete_players(data){
    
  }

}
