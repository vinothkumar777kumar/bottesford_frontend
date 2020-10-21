import {Component, Input, NgZone, OnInit} from '@angular/core';
import {NavigationItem} from '../../navigation';
import {Location} from '@angular/common';
import {DattaConfig} from './../../../../../app-config';
import { ManagerNavigationItem } from '../../manager-navigation';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.css']
})
export class NavGroupComponent implements OnInit {
  @Input() item: any;
  public dattaConfig: any;
  public navigation: any;
  session_data:any;
  constructor(private zone: NgZone, private location: Location,public mnav: ManagerNavigationItem,public nav: NavigationItem,) { 
    this.dattaConfig = DattaConfig.config;
    this.session_data =  JSON.parse(sessionStorage.getItem('login_details'));
    console.log(this.nav.get());
    console.log(this.session_data['role_type']);
    if(this.session_data['role_type'] == 1){
      // this.navigation = NavigationItem;
      this.item = this.nav.get();
    }else if(this.session_data['role_type'] == 2){
      // this.navigation = ManagerNavigationItem);
      this.item = this.mnav.get();
      // console.log(this.navigation);
    }
  }

  
  ngOnInit() {
    // at reload time active and trigger link
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          up_parent.classList.add('pcoded-trigger');
        }
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          last_parent.classList.add('pcoded-trigger');
        }
        last_parent.classList.add('active');
      }
    }
  }

}
