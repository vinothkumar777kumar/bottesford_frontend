import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  matchdata = [];
  emptymatchdata:boolean = false;
  logininfo:any;
  mySubscription: any;
  constructor(private matsr:MatchService,private toastr: ToastrService,private router:Router) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.getteam_matches(this.logininfo['user_id']);
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
