import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/dataservice/team.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  addTeamForm: FormGroup;
  submitted = false;
  teamid:any;
  title = "Add team";
  submit_action = "Add Team"
  constructor(private Activate: ActivatedRoute,private toastr: ToastrService,private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,private router: Router,private tmsv:TeamService) {
    this.Activate.queryParams.subscribe(res => {
      this.teamid = res.id;
      if(this.teamid){
        this.title = "Edit Team";
        this.submit_action = "Update Team";
      }else{
        this.title = 'Add Team';
        this.submit_action = "Add Team";
      }
    this.tmsv.editteam('editteam/'+res.id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'];
        console.log(data);
       
        this.addTeamForm.controls['id'].setValue(data.id);
        this.addTeamForm.controls['team_name'].setValue(data.team_name);
        this.addTeamForm.controls['status'].setValue(data.status);
      }
    });
    });
   }

  ngOnInit(): void {
    this.addTeamForm = this.fb.group({
      id:[''],
      team_name:['',Validators.required],
      status:[1]
    })
  }

    // convenience getter for easy access to form fields
    get f() { return this.addTeamForm.controls; }

    addteam(){
      this.submitted = true;
      console.log(this.addTeamForm.value);
      if(this.addTeamForm.invalid){
  return;
      }else if(this.addTeamForm.value.id){
        this.ngxService.start();
        this.tmsv.updateteam(this.addTeamForm.value).then(res => {
          this.ngxService.stop();
         if(res['status'] == 'success'){
            Swal.fire({
              title: 'Success',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'ok',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/team-list')
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
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
      }else{
        this.ngxService.start();
  this.tmsv.addteam(this.addTeamForm.value).then(res => {
    this.ngxService.stop();
   if(res['status'] == 'success'){
      Swal.fire({
        title: 'Success',
        text: res['message'],
        icon: 'success',
        confirmButtonText: 'ok',
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/team-list')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // this.router.navigateByUrl('/register');
        }
      })
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

}
