import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/dataservice/team.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  emptyteams:boolean = false;
  teamsarray = [];
  constructor(private toastr: ToastrService,private router: Router,private tmsv:TeamService) { 
    this.getteams_data();
  }

  ngOnInit(): void {
  }

  getteams_data(){
    this.tmsv.getdata('getteams').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyteams = true;
    }else{
      data.forEach(t => {
        this.teamsarray.push({id:t.id,team_name:t.team_name,status:t.status});
      })
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

  view_players(data){
    const navigationExtras = {
      queryParams: {
          team_id: data.id  
      }
  };
this.router.navigate(['/view-players'], navigationExtras);
  }

}
