import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;

  logininfo:any;
  changepasswordForm: FormGroup;
  submitted:boolean = false;
  constructor(private acs: MyaccountService,private ds: DataserviceService,private router: Router,
    private toastr: ToastrService,private fb: FormBuilder) { 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.changepasswordForm = this.fb.group({
      user_id:[this.logininfo['user_id']],
      current_password:['',Validators.required],
      new_password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
      confirm_password:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  get c() { return this.changepasswordForm.controls; }

  
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
            this.router.navigateByUrl('/team-manager-dashboard');
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

}
