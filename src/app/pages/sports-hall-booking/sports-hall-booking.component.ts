import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import {IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection, AngularMyDatePickerDirective} from 'angular-mydatepicker';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    mainjsEvent: any;
  }
}

@Component({
  selector: 'app-sports-hall-booking',
  templateUrl: './sports-hall-booking.component.html',
  styleUrls: ['./sports-hall-booking.component.css']
})
export class SportsHallBookingComponent implements OnInit {
  submitted:boolean = false;
  hallbookingForm:FormGroup;
  public date = new Date();
  logininfo:any;
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableUntil: {day: this.date.getDate()-1,month: this.date.getMonth()+1,year: this.date.getFullYear()}
  };
  constructor(private toastr: ToastrService,private fb: FormBuilder,private maser: MyaccountService,private ngxService: NgxUiLoaderService,private router: Router) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
   }

  ngOnInit(): void {
    this.hallbookingForm = this.fb.group({
      id:[''],
      user_id:[this.logininfo['user_id']],
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mobile:['',Validators.required],
      purpose:['',Validators.required],
      booking_date:['',Validators.required],
      location:['',Validators.required],
    });
    window.mainjsEvent.contentWayPoint();
  }

  // convenience getter for easy access to form fields
  get book() { return this.hallbookingForm.controls; }

  bookhall(){
this.submitted = true;
if(this.hallbookingForm.invalid){
  return;
}else{
  let hbd = this.hallbookingForm.value.booking_date;
        
  let gbdd = hbd.singleDate.date;
let d= (gbdd.day < 10 ? '0' : '')+(gbdd.day);
let m = (gbdd.month < 10 ? '0' : '')+(gbdd.month);
  this.hallbookingForm.controls['booking_date'].setValue(d+'-'+m+'-'+gbdd.year);
this.maser.bookhall('bookhall',this.hallbookingForm.value).then(res => {
if(res['status'] == "success"){
  Swal.fire({
    title: 'Success',
    text: res['message'],
    icon: 'success',
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.value) {
      this.router.navigateByUrl('/myaccount');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // this.router.navigateByUrl('/register');
    }
  })
}
},error => {
  console.log(error);
})
}
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onDateChanged(event) {
    // let {date, jsDate, formatted, epoc} = event.singleDate;
    // console.log(event['singleDate'])
      this.hallbookingForm.controls['booking_date'].setValue(event.singleDate.formatted);
      let booked_date = event['singleDate'].date;
       if (Number(booked_date.day) - 1 == 0) {
        let actualDate = new Date(Number(new Date(booked_date.year + "-" + booked_date.month + "-" + booked_date.day)) - 1);
        this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
        this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
        this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
      } else {
        this.myDatePickerOptions.disableUntil.day = Number(booked_date.day) - 1;
        this.myDatePickerOptions.disableUntil.month = Number(booked_date.month);
        this.myDatePickerOptions.disableUntil.year = Number(booked_date.year);
      }
      // this.addcouponform.controls['valid_to'].setValue({isRange: false, singleDate: {date: { 
      //   year: start_date.year,
      //   month: start_date.month, 
      //   day: start_date.day
      // }}});
  
  
  }

}
