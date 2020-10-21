import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
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

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  match_id:any;
  emptymatchtickets:boolean = false;
  ticketdata = [];
  mySubscription: any;
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
          this.dtTrigger.next();
        }
      }
    });
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
   }

  ngOnInit(): void {
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.mySubscription.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
