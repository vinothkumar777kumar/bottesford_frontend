import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-match-schedule',
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  emptymatchscheduledata:boolean = false;
  matchscheduledata = [];
  match_image_api:any;
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getmatch_data();
    this.match_image_api = this.matsr.getmatchimageAPI();
   }

  ngOnInit(): void {
  }

  getmatch_data(){
    this.matsr.getdata('getmatchschedule').then(res => {
      console.log(res['data']);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptymatchscheduledata = true;
    }else{
      data.forEach(m => {
        let cd = moment().format('YYYY-MM-DD');
        let sd = moment(m.match_date,'DD-MM-YYYY').format('YYYY-MM-DD');
        if(moment(sd).isSameOrAfter(cd) == true){
        this.matchscheduledata.push({id:m.id,team_one:m.team_one,team_one_image:this.match_image_api+''+m.team_one_image,
          team_two_image:this.match_image_api+''+m.team_two_image,team_two:m.team_two,
          match_name:m.match_name,round:m.round,match_date:m.match_date,start_time:m.start_time});
        }
      })
      if(this.matchscheduledata.length == 0){
        this.emptymatchscheduledata = true;
      }
    
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

  gotomatchscheduledetails(data){
    const navigationExtras = {
      queryParams: {
          match_id: data.id  
      }
  };
this.router.navigate(['/match-schedule-details'], navigationExtras);
  }

}
