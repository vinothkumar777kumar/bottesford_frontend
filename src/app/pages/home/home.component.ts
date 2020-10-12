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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emptyteams:boolean = false;
  isnextmatch:boolean = false;
  isgameschedule:boolean = false;
  isnextmatchshow:boolean = false;
  islatestgameresult:boolean = false;
  teamsarray = [];
  match_image_api:any;
  nextmatchdata = {
    team_one:'',
    team_one_image:'',
    round:'',
    match_name:'',
    team_two:'',
    team_two_image:''
  };
  lastmatchresult = {
    match_name:'',
    team_one:'',
    team_one_image:'',
    team_one_goal:'',
    team_two_goal:'',
    team_two:'',
    team_two_image:'',
    match_date:'',
    video_url:''
  }
  logininfo:any;
  matchdata = [];
  Images = [];
  nextmatchesdata = [];

  SlideOptions:any;


  CarouselOptions = { items: 2, dots: true, nav: false }; 
OurteamSlideOptions = { items: 5, dots: true, nav: false }; 
  OurteamCarouselOptions = { items: 9, dots: true, nav: false }; 
    TestimonialSlideOptions = { items: 3, dots: true, nav: false };

  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    setTimeout(() => {
      this.getnextmatch_data();
      this.getlastmatchresult_date();
      this.match_image_api = this.matsr.getmatchimageAPI();
    },100);

    setTimeout(() => {
      this.loadnextmatch();
    },1000);
    
    // setInterval(function() { this.makeTimer(); }, 1000);
   }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();

    this.SlideOptions = { items: 3, dots: true, nav: false };  
    this.Images.push({match_name:"World Football",team1:'assets/images/nextmatch1.jpg',team2:'assets/images/nextmatch2.jpg'},
    {match_name:"irst team and u28",team1:'assets/images/gameschd1.jpg',team2:'assets/images/gameschd2.jpg'},
    {match_name:"gjgjg",team1:'assets/images/team-1.jpg',team2:'assets/images/team-2.jpg'},
    {match_name:"gjfgjgf",team1:'assets/images/team-3.jpg',team2:'assets/images/team-4.jpg'});
  }

  getnextmatch_data(){
    this.matsr.getdata('nextmatch').then(res => {
      // console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyteams = true;
    }else{
      data.forEach((m) => {
        let cd = moment().format('YYYY-MM-DD');
        let sd = moment(m.match_date,'DD-MM-YYYY').format('YYYY-MM-DD');
        if(moment(sd).isSameOrAfter(cd) == true){
      this.matchdata.push({id:m.id,match_date:m.match_date,match_name:m.match_name,round:m.round,team_one:m.team_one,
        team_one_image:this.match_image_api+''+m.team_one_image,team_two:m.team_two,team_two_image:this.match_image_api+''+m.team_two_image})
      }
      });
     
      if(this.matchdata.length != 0){ 
        this.isnextmatchshow = true;
        this.isnextmatch = true;
        this.isgameschedule = true; 
     let next = this.matchdata[0];
     this.nextmatchdata.team_one_image =  next.team_one_image;
     this.nextmatchdata.team_one = next.team_one;
     this.nextmatchdata.team_two = next.team_two;
     this.nextmatchdata.team_two_image =next.team_two_image;
     this.nextmatchdata.match_name = next.match_name;
     this.nextmatchdata.round = next.round;
    //  console.log(this.nextmatchdata);
     let edate = this.matchdata[0].match_date.split('-');
     let ded = edate[2] + '-' + edate[1] + '-' + edate[0];
     setInterval(()=> {
      this.makeTimer(new Date(ded+' '+ '00' +':'+'00'));
          },1000)
    //  console.log(moment(ded));
    }else{
      this.isnextmatch = false;
      this.isgameschedule = false;
      this.isnextmatchshow = false;
    }
  }
            }
    },error => {
      console.log(error['status']);
   
     
    })

    
  }

  getlastmatchresult_date(){
    this.matsr.getdata('getlastmatchresult').then(res => {
      // console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'][0];
    if(data == ''){
      this.islatestgameresult = true;
// this.emptyteams = true;
    }else{
      this.islatestgameresult = true;
      this.lastmatchresult.match_name = data.match_name;
      this.lastmatchresult.match_date =  moment(data.match_date,'DD-MM-YYYY').format('ll');
      this.lastmatchresult.team_one = data.team_one;
      this.lastmatchresult.team_one_goal = data.team_one_goal;
      this.lastmatchresult.team_one_image = this.match_image_api+''+data.team_one_image;
      this.lastmatchresult.team_two = data.team_two;
      this.lastmatchresult.team_two_goal = data.team_two_goal;
      this.lastmatchresult.team_two_image = this.match_image_api+''+data.team_two_image;
this.lastmatchresult.video_url = data.video_url;
    }
            }
    },error => {
      console.log(error['status']);
   
     
    })
  }

   makeTimer(match_date) {
    var endTime:any = new Date(match_date);
    var date_now:any = new Date();	
		// endTime = (Date.parse(endTime) / 1000);

    var now:any = new Date().toString();
    var difference = Date.parse(match_date) - Date.parse(now);
		// now = (Date.parse(now) / 1000);

    // var timeLeft = endTime - now;
    if(difference < 0){
      $("#days").html("00" + "<span>Days</span>");
      $("#hours").html("00" + "<span>Hours</span>");
      $("#minutes").html("00" + "<span>Minutes</span>");
      $("#seconds").html("00" + "<span>Seconds</span>");

      
    }else{
      var seconds:any = Math.floor((endTime - (date_now))/1000);
      var minutes:any = Math.floor(seconds/60);
      var hours:any = Math.floor(minutes/60);
    var days:any = Math.floor(hours/24); 
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
		
    
    if (days < "10") { days = "0" + days; }
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }

		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");
    }

}

buyticket(){
if(this.logininfo){
  this.router.navigateByUrl('buyticket');
}else{
  Swal.fire({
    title: 'Info',
    text: 'Please Register for an Account Before Buy Ticket.',
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

loadnextmatch(){
  // console.log(this.matchdata);
  this.matchdata.forEach(m => {
    // console.log(m.match_name);
    this.nextmatchesdata.push({match_name:m.match_name})
  })
}

moredetaillastgameresult(){
  this.matsr.storedatas(this.lastmatchresult);
  this.router.navigate(['/moreinfo-latestgame-result']);
}

}
