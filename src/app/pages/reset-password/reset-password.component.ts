import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup;
  isSubmitted = false;
  token:any;
  constructor(private active_route:ActivatedRoute,private toastr: ToastrService,private fb: FormBuilder,private ds:DataserviceService,
    private ngxService: NgxUiLoaderService,private router: Router,private location: Location) {
      this.active_route.queryParams.subscribe(res => {
        this.token = res['token'];
        if(this.token){
        this.ds.getmethod('find/'+res['token']).then(res => {
          if(res['message']){
            this.toastr.error(res['message'], 'Error', {
              progressBar:true
            });
            this.router.navigateByUrl('/forgot-password');
          }else{
            this.resetPasswordForm.controls['token'].setValue(res['token']);
            this.resetPasswordForm.controls['email'].setValue(res['email']);
          }
          
        },error => {
          if(error.status == 404){
            this.toastr.error(error['error'].message, 'Error', {
              progressBar:true
            });
            this.router.navigateByUrl('/forgot-password');
          }
        });
      }
      });
     }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      token:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      password_confirmation:['',Validators.required]
    })
  }

  get formControls() { return this.resetPasswordForm.controls; }

  resetpassword(){
    console.log(this.resetPasswordForm.value);
    this.isSubmitted  = true;
    if(this.resetPasswordForm.invalid){
      return;
    }else{
      this.ds.postmethod('reset',this.resetPasswordForm).then(res => {
        if(res['status'] == 'success'){
        Swal.fire({
          title:'Success',
          text:res['message'],
          icon: 'success',
          showConfirmButton:true,
          confirmButtonText:'Ok'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl("/login", { skipLocationChange: true }).then(() => {
              console.log([decodeURI(this.location.path())]);
              this.router.navigate([decodeURI(this.location.path())])
              this.router.navigateByUrl('/login');
            });
          }
        })
      }
      },error => {
        if(error.status == 422){
          this.toastr.error(error['error'].message, 'Error', {
            progressBar:true
          });
          this.router.navigateByUrl('/reset-password');
        }
      })
    }
  }

}
