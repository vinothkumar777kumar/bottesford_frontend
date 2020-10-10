import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {DattaConfig} from './../../../../app-config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.css'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit , DoCheck{
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  role:any;
  logininfo:any;
  constructor(config: NgbDropdownConfig,private router: Router,private ds: DataserviceService) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    if(this.logininfo['role_type'] == 1){
      this.role = 'Admin';
    }else if(this.logininfo['role_type'] == 2){
      this.role = 'Manager';
    }
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
  }

  ngOnInit(): void {
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }

  logout(){
  this.ds.logout('admin');
  }

}
