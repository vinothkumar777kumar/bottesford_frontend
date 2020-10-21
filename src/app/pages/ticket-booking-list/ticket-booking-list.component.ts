import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  emptymatchdata:boolean = false;
  matchdata = [];
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getteams_data();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }
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
      });
      this.dtTrigger.next();
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

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
