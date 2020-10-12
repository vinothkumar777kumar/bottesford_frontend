import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/dataservice/team.service';
// declare interface RouteInfo {
//   path: string;
//   title: string;
//   icon: string;
//   class: string;
//   badgecls:string;
//   subMenu:Array<any>;
//   style:string;
// }

export const ROUTES = [
  { path: '/home', title: 'Home',  icon: 'fa fa-user', class: 'nav-item',badgecls:'',subMenu:[],style:"" },
  { path: '/about', title: 'About',  icon:'fa fa-ticket', class: 'nav-item',badgecls:'',subMenu:[],style:""},
  { path: '', title: 'Teams',  icon:'fa fa-ticket', class: 'nav-item dropdown',badgecls:'',subMenu:[
    { path: '/home', title: 'Home',  icon: 'fa fa-user', class: 'nav-item',badgecls:'',subMenu:[] },
  ],style:""},
  { path: '/match', title: 'Match',  icon:'fa fa-image', class: 'nav-item',badgecls:'',subMenu: [],style:""},
  // { path: '/wallet', title: 'Wallet',  icon:'fa fa-ticket', class: '' },
  { path: '/blog', title: 'Blog',  icon:'fa fa-ticket', class: 'nav-item',badgecls:'',subMenu:[],style:""},
  // { path: '/contact', title: 'Contact',  icon:'fa fa-key', class: 'nav-item',badgecls:'',subMenu:[],style:""},
  { path: '/hall-detail', title: 'Book Sports Hall',  icon:'fa fa-lock', class: 'nav-item cta',badgecls:'',subMenu:[],style:"margin-right: 10px"},
  { path: '/login', title: 'Login',  icon:'fa fa-lock', class: 'nav-item cta',badgecls:'nav-item cta',subMenu:[],style:"margin-right: 10px" },
  { path: '/register', title: 'Register',  icon:'fa fa-lock', class: 'nav-item cta',badgecls:'',subMenu:[],style:""}
];

export const AuthROUTES = [
  { path: '/home', title: 'Home',  icon: 'fa fa-user', class: 'nav-item',badgecls:'',subMenu:[],style:"" },
  { path: '/about', title: 'About',  icon:'fa fa-ticket', class: 'nav-item',badgecls:'',subMenu:[],style:""},
  { path: '', title: 'Teams',  icon:'fa fa-ticket', class: 'nav-item dropdown',badgecls:'',subMenu:[
    { path: '/home', title: 'Home',  icon: 'fa fa-user', class: 'nav-item',badgecls:'',subMenu:[] },
  ],style:""},
  { path: '/match', title: 'Match',  icon:'fa fa-image', class: 'nav-item',badgecls:'',subMenu: [],style:""},
  // { path: '/wallet', title: 'Wallet',  icon:'fa fa-ticket', class: '' },
  { path: '/blog', title: 'Blog',  icon:'fa fa-ticket', class: 'nav-item',badgecls:'',subMenu:[],style:""},
  // { path: '/contact', title: 'Contact',  icon:'fa fa-key', class: 'nav-item',badgecls:'',subMenu:[],style:""},
  { path: '/myaccount', title: 'My account',  icon:'fa fa-lock', class: 'nav-item',badgecls:'',subMenu:[],style:"margin-right: 10px"},
  { path: '/cart', title: '',  icon:'fas fa-shopping-cart', class: 'nav-item',badgecls:'badge',subMenu:[],style:"margin-right: 10px" },
  { path: '/hall-detail', title: 'Book Sports Hall',  icon:'fa fa-lock', class: 'nav-item cta',badgecls:'',subMenu:[],style:"margin-right: 10px"},
  { path: '/buyticket', title: 'Buy Ticket',  icon:'fa fa-lock', class: 'nav-item cta',badgecls:'',subMenu:[],style:""}
];

@Component({
  selector: 'app-basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.css']
})
export class BasicHeaderComponent implements OnInit {

  cartdata = [];
  cartlength = 0;
  teamsarray = [];
  public menuItems: any[];
  logininfo:any;
  emptyteamarray:boolean = false;
  constructor(private tmsv:TeamService,private toastr: ToastrService,private router: Router) { 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    if(!this.logininfo){
      this.menuItems = ROUTES.filter(menuItem => menuItem);  
    }else{
    this.menuItems = AuthROUTES.filter(menuItem => menuItem);
    }
    let cart_session_data = JSON.parse(sessionStorage.getItem('cartdata'));
    setTimeout(() => {
      this.getteams_data();
    },1000)
    
    if(cart_session_data != undefined){
    cart_session_data.forEach(d => {
      this.cartdata.push({match_type:d.match_type,matchdate:d.matchdate,team_one:d.team_one,team_one_img:d.team_one_img,
        team_two:d.team_two,team_two_img:d.team_two_img,ticket:d.ticket,ticket_price:d.ticket_price})
    });
  }
  }

  ngOnInit(): void {
  }

  getteams_data(){
    this.tmsv.getdata('getteams').then(res => {
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyteamarray = true;
    }else{
      data.forEach(t => {
        this.teamsarray.push({id:t.id,team_name:t.team_name,status:t.status});
      })
    }
            }
    },error => {
      let err = error['error'];
if(error['status'] == 0){
        this.toastr.error('net::ERR_CONNECTION_REFUSED', 'Error', {
          progressBar:true
        });
        return;
       }else if(error['error']){
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
