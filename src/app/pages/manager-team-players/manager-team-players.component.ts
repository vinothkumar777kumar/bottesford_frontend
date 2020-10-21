import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatchService } from 'src/app/dataservice/match.service';
import { TeamService } from 'src/app/dataservice/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-team-players',
  templateUrl: './manager-team-players.component.html',
  styleUrls: ['./manager-team-players.component.css']
})
export class ManagerTeamPlayersComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  logininfo:any;
  emptyteamplayers:boolean = false;
  teamplayers = [];
  user_id:any;
  mySubscription: any;
  constructor(private tmsv:TeamService,private router:Router,private matsr:MatchService ) { 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.user_id = this.logininfo['user_id'];
    this.getteam_players(this.user_id);

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
          this.dtTrigger.next();
        }
      }
    });
  }

  edit_players(data){
    const navigationExtras = {
      queryParams: {
          player_id: data.id  
      }
  };
this.router.navigate(['manager-addteam-players'], navigationExtras);
  }

  delete_players(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this player?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.matsr.deletematch('deleteplayer/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.teamplayers = [];
               this.getteam_players(this.user_id);
              //  this.router.navigateByUrl('/coupon');
                  
          this.router.navigateByUrl('/manager-team-players', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/manager-team-players']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('/manager-team-players');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('/manager-team-players');
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
