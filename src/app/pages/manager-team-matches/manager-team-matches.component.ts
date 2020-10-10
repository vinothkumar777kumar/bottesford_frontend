import { Component, OnInit,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
@Component({
  selector: 'app-manager-team-matches',
  templateUrl: './manager-team-matches.component.html',
  styleUrls: ['./manager-team-matches.component.css']
})
export class ManagerTeamMatchesComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  matchdata = [];
  emptymatchdata:boolean = false;
  logininfo:any;
  constructor(private matsr:MatchService,private toastr: ToastrService,) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.getteam_matches(this.logininfo['user_id']);
   }

  ngOnInit(): void {
  }

  getteam_matches(user_id){
    this.matsr.getdata('getmanagerallmatchdata/'+user_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptymatchdata = true;
    }else{
      data.forEach(m => {
        this.matchdata.push({id:m.id,team_one:m.team_one,team_two:m.team_two,match_name:m.match_name,round:m.round,match_date:m.match_date,});
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

}
