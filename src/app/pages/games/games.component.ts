import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';
import * as $ from 'jquery';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/dataservice/cart.service';

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
selectticket = [];
mySubscription: any;
  constructor(private router: Router,private matsr: MatchService,private toastr: ToastrService,private cars:CartService) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.getmatch_data();
    this.match_image_api = this.matsr.getmatchimageAPI();

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
        team_one_image:this.match_image_api+''+m.team_one_image,team_two:m.team_two,team_two_image:this.match_image_api+''+m.team_two_image,
      start_time:m.start_time,end_time:m.end_time,ticket_price:m.ticket_price})
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
    // let selectticket:any = [];
    this.selectticket = [];
    this.selectticket.push({
      match_id:data.id,
      matchdate:data.match_date,
      match_name:data.match_name,
      team_one:data.team_one,
      team_one_image:data.team_one_image,
      team_two:data.team_two,
      team_two_image:data.team_two_image,
      ticket:ticket,
      start_time:data.start_time,
      ticket_price:data.ticket_price
    });
    console.log(this.selectticket);
    let cart_session_data = JSON.parse(sessionStorage.getItem('cartdata'));
    console.log(cart_session_data);
    if(cart_session_data != null){
      cart_session_data.forEach(d => {
        this.selectticket.push({match_id:d.match_id,match_name:d.match_name,match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_image:d.team_one_image,
          team_two:d.team_two,team_two_image:d.team_two_image,ticket:d.ticket,ticket_price:d.ticket_price,
          start_time:d.start_time})
      })
    }
    sessionStorage.removeItem('cartdata');
    this.toastr.info('Ticket Add To Cart.', 'Info', {
      progressBar:true,
      timeOut:2000
    });
    sessionStorage.setItem('cartdata',JSON.stringify(this.selectticket));
    this.cars.getticket(this.selectticket);
  
  // this.ngOnDestroy();
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

  gotocart(){
    if(this.selectticket.length == 0){
      this.toastr.info('Please Buy a tickets', 'Info', {
        progressBar:true
      });
      return;
   
  }else{
    let cart_session_data = JSON.parse(sessionStorage.getItem('cartdata'));
    console.log(cart_session_data);
    if(cart_session_data != null){
      cart_session_data.forEach(d => {
        this.selectticket.push({match_id:d.match_id,match_name:d.match_name,match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_image:d.team_one_img,
          team_two:d.team_two,team_two_image:d.team_two_img,ticket:d.ticket,ticket_price:d.ticket_price,
          start_time:d.start_time})
      })
    }
    this.router.navigateByUrl('/cart');
  }
    
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
