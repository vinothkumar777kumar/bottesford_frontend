import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/dataservice/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminloginform:FormGroup;
  submitted = false;
  constructor(private toastr: ToastrService,private fb: FormBuilder,private auth:AuthService,private ngxService: NgxUiLoaderService,private router: Router) {

   }

  ngOnInit(): void {
    this.adminloginform = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
    })
  }


// convenience getter for easy access to form fields
get f() { return this.adminloginform.controls; }

  adminlogin(){
    this.submitted = true;
    if(this.adminloginform.invalid){
      return;
    }else{
      this.ngxService.start();
this.auth.login(this.adminloginform.value).then(res => {
  this.ngxService.stop();
  if(res['status'] == 'success'){
    this.auth.seesionuser_info(res);
    if(res['role_type'] == 1){
    this.toastr.success(res['message'], 'Info', {
      progressBar:true,
      timeOut:10000
    });
setTimeout(() => {
    this.router.navigateByUrl('dashboard', { skipLocationChange: false }).then(() => {
      this.router.navigate(['dashboard']);
  });
},1000);
}else{
  this.router.navigateByUrl('login', { skipLocationChange: false }).then(() => {
    this.router.navigate(['login']);
});
  }
}
  console.log(res);
},error => {
  this.ngxService.stop();
  console.log(error);
  if(error['error'].status == 401){
    this.toastr.error(error['error'].message, 'Login failed', {
      progressBar:true
    });
  }else{
    this.toastr.error('net::ERR_CONNECTION_REFUSED', 'Login failed', {
      progressBar:true
    });
  }
});
    }
  }

}
