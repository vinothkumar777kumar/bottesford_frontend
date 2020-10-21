import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/dataservice/team.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.css']
})
export class ViewPlayersComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  teamid:any;
  emptyteamplayers:boolean = false;
  teamplayers = [];
  teamname:string;
  constructor(private Activate: ActivatedRoute,private toastr: ToastrService,private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,private router: Router,private tmsv:TeamService) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      }
      this.Activate.queryParams.subscribe(res => {
        this.teamid = res.team_id;
        this.getteam_player(this.teamid);
   
      });
    
   }

  ngOnInit(): void {
  }

  getteam_player(team_id){
    this.tmsv.getdata('getteamplayers/'+team_id).then(res => {
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
          // this.dtTrigger.next();
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
this.router.navigate(['add-player'], navigationExtras);
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
        this.tmsv.delete('deleteplayer/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.teamplayers = [];
               this.getteam_player(this.teamid);
              //  this.router.navigateByUrl('/coupon');
                  
          this.router.navigateByUrl('/manager-team-player', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/match-list']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('/match-list');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('/match-list');
      }
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
