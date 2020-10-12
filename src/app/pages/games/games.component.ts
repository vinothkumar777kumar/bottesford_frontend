import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import * as $ from 'jquery';
import * as moment from 'moment';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  matchdata = [];
emptymatchdata:boolean = false;
match_image_api:any;
logininfo:any;
  constructor(private router: Router,private matsr: MatchService,private toastr: ToastrService) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.getmatch_data();
    this.match_image_api = this.matsr.getmatchimageAPI();
   }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

  getmatch_data(){
    this.matsr.getdata('nextmatch').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptymatchdata = true;
    }else{

      data.forEach((m) => {
        let cd = moment().format('YYYY-MM-DD');
        let sd = moment(m.match_date,'DD-MM-YYYY').format('YYYY-MM-DD');
        if(moment(sd).isSameOrAfter(cd) == true){
      this.matchdata.push({id:m.id,match_date:moment(m.match_date,'DD-MM-YYYY').format('ll'),match_name:m.match_name,round:m.round,team_one:m.team_one,
        team_one_image:this.match_image_api+''+m.team_one_image,team_two:m.team_two,team_two_image:this.match_image_api+''+m.team_two_image})
      }
      });
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


  buyticket(data){
    if(this.logininfo){
    console.log(data);
    let ticket = this.get_randomticket();
    let selectticket:any = [];
    selectticket.push({
      match_id:data.id,
      matchdate:data.match_date,
      match_name:data.match_name,
      team_one:data.team_one,
      team_one_img:data.team_one_image,
      team_two:data.team_two,
      team_two_img:data.team_two_image,
      ticket:ticket,
      ticket_price:2.70
    });
    console.log(selectticket);
    sessionStorage.setItem('cartdata',JSON.stringify(selectticket));
    this.router.navigateByUrl('/cart', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/cart']);
  });
}else{
  Swal.fire({
    title: 'Info',
    text: 'Please Login for an Account Before Book Ticket.',
    icon: 'info',
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.value) {
      this.router.navigateByUrl('/login');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // this.router.navigateByUrl('/register');
    }
  })
}

  }

  get_randomticket(){
    var arr = [];
    while(arr.length < 1){
        var r = Math.floor(Math.random() * 1000) + 1;
        if(arr.indexOf(r) === -1) return r;
    }
    // console.log(arr);
  }

}
