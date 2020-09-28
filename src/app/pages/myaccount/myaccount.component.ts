import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import Swal from 'sweetalert2'

declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  submitted:boolean = false;
  logininfo;
  myaccountForm: FormGroup;
  changepasswordForm: FormGroup;
  myticketsarray = [];
  bookhalldata = [];
  nomytickets:boolean = false;
  nomybookhalldata:boolean = false;
  
  constructor(private acs: MyaccountService,private ds: DataserviceService,private router: Router,
    private toastr: ToastrService,private fb: FormBuilder) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    if(!this.logininfo){
      this.router.navigateByUrl('/login')
    }
    this.acs.getdata('myaccount/'+this.logininfo['user_id']).then(res => {
      if(res['status'] == 'success'){
        this.myaccountForm.controls['id'].setValue(res['data'].id);
        this.myaccountForm.controls['name'].setValue(res['data'].name);
        this.myaccountForm.controls['email'].setValue(res['data'].email);
        this.myaccountForm.controls['address_one'].setValue(res['data'].address_one);
        this.myaccountForm.controls['postcode'].setValue(res['data'].postcode);
        this.myaccountForm.controls['mobile'].setValue(res['data'].mobile);
        this.myaccountForm.controls['town'].setValue(res['data'].town);
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
    window.mainjsEvent.contentWayPoint();
    this.get_bookedtickets();
    this.get_booksportshall();
   }

  ngOnInit(): void {
    this.myaccountForm = this.fb.group({
      id:[''],
      name:['',Validators.required],
      email:['',Validators.required],
      address_one:['',Validators.required],
      postcode:['',Validators.required],
      mobile:['',Validators.required],
      town:['',Validators.required]
    })
    this.changepasswordForm = this.fb.group({
      user_id:[this.logininfo['user_id']],
      current_password:['',Validators.required],
      new_password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
      confirm_password:['',Validators.required],
    })
  }

     // convenience getter for easy access to form fields
     get f() { return this.myaccountForm.controls; }

     get c() { return this.changepasswordForm.controls; }

  updatemyaccount(){
    this.submitted = true;
if(this.myaccountForm.invalid){
  return;
}else{
  this.acs.updatemyaccount('updatemyaccount',this.myaccountForm.value).then(res => {
    if(res['status'] == 'success'){
      Swal.fire({
        title: 'Success',
        text: res['message'],
        icon: 'success',
        confirmButtonText: 'ok',
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

  get_bookedtickets(){
    this.acs.getdata('getuserticket/'+this.logininfo['user_id']).then(res => {
      console.log(res);
      if(res['status'] == 'success'){

    let data = res['data'];
    if(data == ''){
this.nomytickets = true;
    }else{
      data.forEach(t => {
        this.myticketsarray.push({id:t.id,username:t.name,match_type:t.match_type,matchdate:t.matchdate,team_one:t.team_one,team_two:t.team_two,ticket:t.ticket,ticket_price:t.ticket_price});
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
  get_booksportshall(){
    this.acs.getdata('getsportshallbookdata/'+this.logininfo['user_id']).then(res => {
      console.log(res);
      if(res['status'] == 'success'){

    let data = res['data'];
    if(data == ''){
this.nomybookhalldata = true;
    }else{
      data.forEach(b => {
        this.bookhalldata.push({id:b.id,email:b.email,location:b.location ,
          mobile:b.mobile,name:b.name,purpose:b.purpose,booking_date:b.booking_date});
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

  updatpassword(){
    this.submitted = true;
if(this.changepasswordForm.invalid){
  return;
}else{
  let c_p = this.changepasswordForm.value.current_password;
  let n_p = this.changepasswordForm.value.new_password;
  let con_p = this.changepasswordForm.value.confirm_password;
  if(n_p != con_p){
    this.toastr.error("New Password and Confirm password not Match", 'Info', {
      progressBar:true
    });
    return;
  }else{
    this.acs.updatepasswoed('updatepassword',this.changepasswordForm.value).then(res => {
      if(res['status'] == "faile"){
        this.toastr.error(res['message'], 'Info', {
          progressBar:true
        });
        return;
      }else if(res['status'] == "success"){
        this.changepasswordForm.get('current_password').clearValidators();
        this.changepasswordForm.get('current_password').updateValueAndValidity();
        this.changepasswordForm.get('new_password').clearValidators();
        this.changepasswordForm.get('new_password').updateValueAndValidity();
        this.changepasswordForm.get('confirm_password').clearValidators();
        this.changepasswordForm.get('confirm_password').updateValueAndValidity();
        Swal.fire({
          title: 'Success',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'ok',
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/myaccount');
            this.changepasswordForm.reset();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // this.router.navigateByUrl('/register');
          }
        })
      }
    })
  }

}
  }

  logout(){
    this.ds.logout('user');
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
