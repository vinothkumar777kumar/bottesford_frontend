import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  matchdata = [];
  emptymatchdata:boolean = false;
  
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

  edit_match(data){
    const navigationExtras = {
      queryParams: {
          match_id: data.id  
      }
  };
this.router.navigate(['/add-match'], navigationExtras);

  }

  delete_match(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this match?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.matsr.deletematch('deletematch/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.matchdata = [];
               this.getteams_data();
              //  this.router.navigateByUrl('/coupon');
                  
          this.router.navigateByUrl('/match-list', { skipLocationChange: true }).then(() => {
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

}