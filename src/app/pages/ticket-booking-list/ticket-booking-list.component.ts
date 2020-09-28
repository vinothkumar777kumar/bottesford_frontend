import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';


@Component({
  selector: 'app-ticket-booking-list',
  templateUrl: './ticket-booking-list.component.html',
  styleUrls: ['./ticket-booking-list.component.css']
})
export class TicketBookingListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  emptymatchdata:boolean = false;
  matchdata = [];
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getteams_data();
  }

  ngOnInit(): void {
  }

  getteams_data(){
    this.matsr.getdata('getallmatch').then(res => {
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

  viewmatch_tickets(data){
    const navigationExtras = {
      queryParams: {
          match_id: data.id  
      }
  };
this.router.navigate(['/view-booking-list'], navigationExtras);

  }

}
