import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-hall-detail',
  templateUrl: './hall-detail.component.html',
  styleUrls: ['./hall-detail.component.css']
})
export class HallDetailComponent implements OnInit {
  logininfo:any;
  constructor(private router: Router) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
   }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

  gotohallbooking(){
    if(this.logininfo){
      this.router.navigateByUrl('/sports-hall-booking');
    }else{
      Swal.fire({
        title: 'Info',
        text: 'Please Login for an Account Before Book Sports Hall.',
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

}
