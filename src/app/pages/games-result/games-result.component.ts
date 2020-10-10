import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-games-result',
  templateUrl: './games-result.component.html',
  styleUrls: ['./games-result.component.css']
})
export class GamesResultComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  gamesresultdata = [];
  emptygamesresultdata:boolean = false;
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getgamesresult_data();
   }

  ngOnInit(): void {
  }

  getgamesresult_data(){
    this.matsr.getdata('getallmatchresult').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptygamesresultdata = true;
    }else{
      data.forEach(m => {
        // let cd = moment().format('YYYY-MM-DD');
        // let sd = moment(m.match_date,'DD-MM-YYYY').format('YYYY-MM-DD');
        // if(moment(sd).isBefore(cd) == true){
        this.gamesresultdata.push({id:m.id,team_one:m.team_one,team_two:m.team_two,
          match_name:m.match_name,round:m.round,match_date:m.match_date,team_one_goal:m.team_one_goal,
          team_two_goal:m.team_two_goal});
        // }
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

  edit_game_result(data){
    const navigationExtras = {
      queryParams: {
          match_id: data.id  
      }
  };
this.router.navigate(['/add-game-result'], navigationExtras);

  }

  delete_game_result(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this match result?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.matsr.deletematch('deletematchresult/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.gamesresultdata = [];
               this.getgamesresult_data();
              //  this.router.navigateByUrl('/coupon');
                  
          this.router.navigateByUrl('/games-result', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/games-result']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('/games-result');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('/games-result');
      }
    })
    
  
  }

}
