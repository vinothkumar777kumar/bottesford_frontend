import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/dataservice/match.service';

@Component({
  selector: 'app-sportshall-booking-list',
  templateUrl: './sportshall-booking-list.component.html',
  styleUrls: ['./sportshall-booking-list.component.css']
})
export class SportshallBookingListComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  emptysportshallbookingdata:boolean = false;
  bookedsportshalldata = [];
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getbookedsportshall_data();
   }

  ngOnInit(): void {
  }

  getbookedsportshall_data(){
    this.matsr.getdata('get_sportshallbooked').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptysportshallbookingdata = true;
    }else{
      data.forEach(s => {
        this.bookedsportshalldata.push({id:s.id,name:s.name,booking_date:s.booking_date,email:s.email,
          location:s.location,mobile:s.mobile,purpose:s.purpose});
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

}
