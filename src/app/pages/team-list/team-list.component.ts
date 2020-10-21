import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/dataservice/team.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  emptyteams:boolean = false;
  teamsarray = [];
  constructor(private toastr: ToastrService,private router: Router,private tmsv:TeamService) { 
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
    this.tmsv.getdata('getteams').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyteams = true;
    }else{
      data.forEach(t => {
        this.teamsarray.push({id:t.id,team_name:t.team_name,team_manager_email:t.team_manager_email,
          team_manager_name:t.team_manager_name,team_manager_mobile:t.team_manager_mobile,status:t.status});
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

  edit_team(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/add-team'], navigationExtras);
  }
  delete_team(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this team?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.tmsv.delete('deleteteams/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.teamsarray = [];
               this.getteams_data();                  
          this.router.navigateByUrl('team-list', { skipLocationChange: true }).then(() => {
            this.router.navigate(['team-list']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('team-list');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('team-list');
      }
    })
    
  
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
