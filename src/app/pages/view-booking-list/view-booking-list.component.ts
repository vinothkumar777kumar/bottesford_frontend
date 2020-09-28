import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatchService } from 'src/app/dataservice/match.service';

@Component({
  selector: 'app-view-booking-list',
  templateUrl: './view-booking-list.component.html',
  styleUrls: ['./view-booking-list.component.css']
})
export class ViewBookingListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  match_id:any;
  emptymatchtickets:boolean = false;
  ticketdata = [];
  constructor(private Activate: ActivatedRoute,private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,private router: Router,private matsr:MatchService) {
    this.Activate.queryParams.subscribe(res => {
      this.match_id = res.match_id;
      if(this.match_id){
     
      }else{

      }
    this.matsr.getdata('getmatchtickets/'+res.match_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'];
        if(data == ''){
          this.emptymatchtickets= true;
        }else{
          data.forEach(t => {
            this.ticketdata.push({matchdate:t.matchdate,ticket:t.ticket,team_one:t.team_one,team_two:t.team_two,
              ticket_price:t.ticket_price,match_type:t.match_type,name:t.name,total_ticket:t.total_ticket})
          });
        }
      }
    });
    });
   }

  ngOnInit(): void {
  }

}
