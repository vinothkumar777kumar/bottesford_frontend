import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/dataservice/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService,private fb: FormBuilder,private auth:AuthService,
    private ngxService: NgxUiLoaderService,private router: Router) { }
  loginForm:FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }else{
      this.ngxService.start();
this.auth.login(this.loginForm.value).then(res => {
  this.ngxService.stop();
  if(res['status'] == 'success'){
    if(res['role_type'] == 2){
    this.auth.seesionuser_info(res);
    this.toastr.success(res['message'], 'Info', {
      progressBar:true
    });
    // this.router.navigate(['/about']);
    this.router.navigateByUrl('/myaccount', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/myaccount']);
  });
}else{
  this.router.navigateByUrl('/home', { skipLocationChange: false }).then(() => {
    this.router.navigate(['/home']);
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
