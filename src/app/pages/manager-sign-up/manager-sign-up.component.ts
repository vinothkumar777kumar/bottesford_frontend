import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/dataservice/auth.service';
import { register } from 'src/app/entities/register.entity';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-sign-up',
  templateUrl: './manager-sign-up.component.html',
  styleUrls: ['./manager-sign-up.component.css']
})
export class ManagerSignUpComponent implements OnInit {
  managerRegisterForm: FormGroup;
  submitted = false;
  constructor(private toastr: ToastrService,private fb: FormBuilder,private auth: AuthService,private ngxService: NgxUiLoaderService,private router: Router) { }

  ngOnInit(): void {
    this.managerRegisterForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
      mobile:['',Validators.required],
      role_type:['2'],
      status:['1'],
    });
  }

     // convenience getter for easy access to form fields
     get f() { return this.managerRegisterForm.controls; }

     signup(){
      this.submitted = true;
      console.log(this.managerRegisterForm.value);
      if(this.managerRegisterForm.invalid){
  return;
      }else{
        this.ngxService.start();
        let data :register = this.managerRegisterForm.value;
        // let data = new FormData();
        // data.append('name',this.registerForm.value.name);
        // data.append('email',this.registerForm.value.email);
        // data.append('password',this.registerForm.value.password);
        // data.append('mobile',this.registerForm.value.mobile);
        // console.log(this.registerForm.value);
  this.auth.register(data).then(res => {
    this.ngxService.stop();
   if(res['status'] == 'success'){
      this.router.navigateByUrl('/admin')
      this.toastr.success(res['message'], 'Info', {
        progressBar:true,
        timeOut:10000
      });
    }
  },error => {
    this.ngxService.stop();
    this.ngxService.stopLoader('loader-01');
    if(error['error']['status'] == 401){
      if(error['error']['validation_error'].email){
        this.ngxService.stop();
        this.ngxService.stopLoader('loader-01');
        this.toastr.error(error['error']['validation_error'].email, 'Info', {
          progressBar:true
        });
      }else if(error['error']['validation_error'].mobile){
        this.ngxService.stop();
        this.ngxService.stopLoader('loader-01');
        this.toastr.error(error['error']['validation_error'].mobile, 'Info', {
          progressBar:true
        });
      }
        }
    
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

}
