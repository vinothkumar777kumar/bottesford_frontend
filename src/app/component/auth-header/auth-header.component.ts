import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/dataservice/team.service';


@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  cartdata = [];
  cartlength = 0;
  teamsarray = [];
  constructor(private tmsv:TeamService,private toastr: ToastrService,private router: Router) { 
    let cart_session_data = JSON.parse(sessionStorage.getItem('cartdata'));
    this.getteams_data();
    console.log(cart_session_data);
    if(cart_session_data != undefined){
    cart_session_data.forEach(d => {
      this.cartdata.push({match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_img:d.team_one_img,
        team_two:d.team_two,team_two_img:d.team_two_img,ticket:d.ticket,ticket_price:d.ticket_price})
    });
  }
  }

  ngOnInit(): void {
    this.cartlength = this.cartdata.length;
  }

  getteams_data(){
    this.tmsv.getdata('getteams').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
// this.emptyteams = true;
    }else{
      data.forEach(t => {
        this.teamsarray.push({id:t.id,team_name:t.team_name,status:t.status});
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

  gototeamplayers(data){
    const navigationExtras = {
      queryParams: {
          team_id: data.id  
      }
  };
this.router.navigate(['/team-players'], navigationExtras);
  }

}
