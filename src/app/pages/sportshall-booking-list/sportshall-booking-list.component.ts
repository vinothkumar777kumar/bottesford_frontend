import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  emptysportshallbookingdata:boolean = false;
  bookedsportshalldata = [];
  constructor(private toastr: ToastrService,private router: Router,private matsr:MatchService) {
    this.getbookedsportshall_data();
   
   }

  ngOnInit(): void {
  }

  getbookedsportshall_data(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }
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
      });
      this.dtTrigger.next();
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

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
