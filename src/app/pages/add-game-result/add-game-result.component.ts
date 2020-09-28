import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection, AngularMyDatePickerDirective} from 'angular-mydatepicker';
import { MatchService } from 'src/app/dataservice/match.service';

@Component({
  selector: 'app-add-game-result',
  templateUrl: './add-game-result.component.html',
  styleUrls: ['./add-game-result.component.css']
})
export class AddGameResultComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  imageinput:boolean = true;
  teamoneimageinputshow:boolean = true;
  teamoneimageshow:boolean = false;
  teamtwoimageinputshow:boolean = true;
  teamtwoimageshow:boolean = false;
  submitted = false;
  addMatchResultForm:FormGroup;
  title = "Add Match Result";
  submit_action = "save";
  public date = new Date(); 
  file :any = [];
  file1 :any = [];
  teamsarray = [];
  match_id:any;
  teamoneimage_name:any;
  teamtwoimage_name:any;
  playerimage_name:any;
  match_image_api:any;
  teamoneimage_url:any;
  teamtwoimage_url:any;
public myDatePickerOptions: IAngularMyDpOptions = {
  dateRange: false,
  dateFormat: 'dd-mm-yyyy',
  disableDates: [{dates: [{year: 1885, month: 1, day: 1}, {year: 2011, month: 1, day: 1}], styleClass: 'yoga'}],
  disableSince: {day: this.date.getDate()+1,month: this.date.getMonth()+1,year: this.date.getFullYear()}
};
  constructor(private toastr: ToastrService,private ngxService: NgxUiLoaderService,private router: Router,
    private matsr:MatchService,private fb: FormBuilder,private Activate: ActivatedRoute) {
      this.addMatchResultForm = this.fb.group({
        id:[''],
        team_one:['',Validators.required],
        team_one_image:['',Validators.required],
        team_two:['',Validators.required],
        team_two_image:['',Validators.required],
        match_name:['',Validators.required],
        team_one_goal:['',Validators.required],
        team_two_goal:['',Validators.required],
        match_date:['',Validators.required],
        video_url:['',Validators.required]
      })
      this.getteams_data();
      this.match_image_api = this.matsr.getmatchimageAPI();
    this.Activate.queryParams.subscribe(res => {
      this.match_id = res.match_id;
      if(this.match_id){
        this.title = "Edit Match Result";
        this.submit_action = "Update";
        this.teamoneimageinputshow = false;
        this.teamoneimageshow = true;
        this.teamtwoimageinputshow = false;
        this.teamtwoimageshow = true;
      }else{
        this.title = 'Add Match Result';
        this.submit_action = "Save";
        this.teamoneimageinputshow = true;
        this.teamoneimageshow = false;
        this.teamtwoimageinputshow = true;
        this.teamtwoimageshow = false;
      }
    this.matsr.editmatch('editmatchresult/'+res.match_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'];
        console.log(data);
       
        this.addMatchResultForm.controls['id'].setValue(data.id);
        this.addMatchResultForm.controls['team_one'].setValue(data.team_one);
        this.addMatchResultForm.get('team_one_image').clearValidators();
          this.addMatchResultForm.get('team_one_image').updateValueAndValidity();

          this.addMatchResultForm.controls['team_two'].setValue(data.team_two);
          this.addMatchResultForm.get('team_two_image').clearValidators();
            this.addMatchResultForm.get('team_two_image').updateValueAndValidity();
        this.teamoneimage_name = data.team_one_image;
        this.teamtwoimage_name = data.team_two_image;
        this.teamoneimage_url = this.match_image_api+''+data.team_one_image;
        this.teamtwoimage_url = this.match_image_api+''+data.team_two_image;
        let matcd = data.match_date.split('-');
      let mtcd = matcd[0] +'-'+matcd[1]+'-'+matcd[2];
      let rplace = /^0+/;
      let md = matcd[0].replace(rplace,'');
      let mm = matcd[1].replace(rplace,'');

       
        if (Number(md) - 1 == 0) {
          let actualDate = new Date(Number(new Date(matcd[2] + "-" + mm + "-" + md)) - 1);
          this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
          this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
          this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
        } else {
          this.myDatePickerOptions.disableSince.day = Number(md) + 1;
          this.myDatePickerOptions.disableSince.month = Number(mm);
          this.myDatePickerOptions.disableSince.year = Number(matcd[2]);
        }
        this.addMatchResultForm.controls['match_date'].setValue({isRange: false, singleDate: {date: { 
          year: matcd[2], 
          month: mm, 
          day: md
        }}});
     
        this.addMatchResultForm.controls['match_name'].setValue(data.match_name);
        this.addMatchResultForm.controls['team_one_goal'].setValue(data.team_one_goal);
        this.addMatchResultForm.controls['team_two_goal'].setValue(data.team_two_goal);
        this.addMatchResultForm.controls['video_url'].setValue(data.video_url);
      }
    });
    });
     }

  ngOnInit(): void {
  }

  
   // convenience getter for easy access to form fields
   get f() { return this.addMatchResultForm.controls; }

  getteams_data(){
    this.matsr.getdata('getallmatch').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
// this.emptyteams = true;
    }else{
      data.forEach(m=> {
        this.teamsarray.push({id:m.id,team_one:m.team_one,team_two:m.team_two,match_name:m.match_name,round:m.round,match_date:m.match_date});
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

  addmatchresult(){
    this.submitted = true;
    console.log(this.addMatchResultForm.value) ;
    if(this.addMatchResultForm.invalid){     
      console.log(this.addMatchResultForm.value) ;
      return;
    }else{
      console.log(this.addMatchResultForm.value);
      if(this.addMatchResultForm.value.id){
        console.log(this.addMatchResultForm.value);
        console.log(this.file);
      
        let matchdate = this.addMatchResultForm.value.match_date;
        let md = matchdate.singleDate.date;
    let d= (md.day < 10 ? '0' : '')+(md.day);
    let m = (md.month < 10 ? '0' : '')+(md.month);
    // console.log(dob);
        this.addMatchResultForm.controls['match_date'].setValue(d+'-'+m+'-'+md.year);
        const myFormData = new FormData();
        myFormData.append('id',  this.addMatchResultForm.value.id);
        if (this.file == '') {
          myFormData.append('team_one_image', this.teamoneimage_name);
        } else {
          myFormData.append('team_one_image', this.file, this.file.name);
        }
        if (this.file1 == '') {
          myFormData.append('team_two_image', this.teamtwoimage_name);
        } else {
          myFormData.append('team_two_image', this.file1, this.file1.name);
        }
      
      myFormData.append('team_one',  this.addMatchResultForm.value.team_one);
      myFormData.append('team_two',  this.addMatchResultForm.value.team_two);
      myFormData.append('match_name',  this.addMatchResultForm.value.match_name);
      myFormData.append('team_one_goal',  this.addMatchResultForm.value.team_one_goal);
      myFormData.append('team_two_goal',  this.addMatchResultForm.value.team_two_goal);
      myFormData.append('match_date',  this.addMatchResultForm.value.match_date);
      myFormData.append('video_url',  this.addMatchResultForm.value.video_url);
        this.ngxService.start();
        this.matsr.postmethode('updatematchresult',myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/games-result');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
          }
    },error => {
      this.ngxService.stop();
      console.log(error);
    });
      }else{
        let matchd = this.addMatchResultForm.value.match_date;
      
        let md = matchd.singleDate.date;
    let d= (md.day < 10 ? '0' : '')+(md.day);
    let m = (md.month < 10 ? '0' : '')+(md.month);
        this.addMatchResultForm.controls['match_date'].setValue(d+'-'+m+'-'+md.year);
        const myFormData = new FormData();
       
          myFormData.append('team_one_image', this.file, this.file.name);
          myFormData.append('team_two_image', this.file1, this.file1.name);
        
        myFormData.append('team_one',  this.addMatchResultForm.value.team_one);
        myFormData.append('team_two',  this.addMatchResultForm.value.team_two);
        myFormData.append('match_name',  this.addMatchResultForm.value.match_name);
        myFormData.append('team_one_goal',  this.addMatchResultForm.value.team_one_goal);
      myFormData.append('team_two_goal',  this.addMatchResultForm.value.team_two_goal);
        myFormData.append('match_date',  this.addMatchResultForm.value.match_date);
        myFormData.append('video_url',  this.addMatchResultForm.value.video_url);
        this.ngxService.start();
        this.matsr.postmethode('addmatchresult',myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Success',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/games-result');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
          }
    },error => {
      this.ngxService.stop();
      console.log(error);
    });
      }
 
    }
  }
  onDateChanged(event,text_date) {
    // let {date, jsDate, formatted, epoc} = event.singleDate;
    // console.log(event['singleDate'])
    if(text_date == 'changedate'){
      this.addMatchResultForm.controls['match_date'].setValue(event.singleDate.formatted);
      let start_date = event['singleDate'].date;
      console.log(start_date.day,start_date.month,start_date.year)
      // this.myDatePickerOptions = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
      //  };
      //    this.myDatePickerOptions1 = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
      //  };
       if (Number(start_date.day) - 1 == 0) {
        let actualDate = new Date(Number(new Date(start_date.year + "-" + start_date.month + "-" + start_date.day)) - 1);
        this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
        this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
        this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
      } else {
        this.myDatePickerOptions.disableUntil.day = Number(start_date.day) - 1;
        this.myDatePickerOptions.disableUntil.month = Number(start_date.month);
        this.myDatePickerOptions.disableUntil.year = Number(start_date.year);
      }
      // this.addcouponform.controls['valid_to'].setValue({isRange: false, singleDate: {date: { 
      //   year: start_date.year,
      //   month: start_date.month, 
      //   day: start_date.day
      // }}});
    }
  
  
  }

  fileProgress(fileInput: any,team) {
    if(team == 'team_one'){
      console.log(fileInput)
      let fileData = fileInput.target.files[0];
      this.file=fileData;
      // let arr = fileData.split('/'); 
      console.log(this.file);
    }else{
      let fileData = fileInput.target.files[0];
      this.file1=fileData;
    }
 
  }

  deletematchImage(team){
    if(team == 'teamoneimage'){
    this.teamoneimageshow = false;
    this.teamoneimageinputshow = true;
    this.teamoneimage_url = '';
    this.addMatchResultForm.get('team_one_image').setValidators(Validators.required);
    this.addMatchResultForm.get('team_one_image').updateValueAndValidity();
    this.matsr.deletematch('deletematchresultimage/'+this.teamoneimage_name).then(res => {
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Deleted',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/register');
          }
        })

      }
    }, error => {
      let err = error['error'];
      if(error['status'] == 401){
    if(err['status'] == 'faile'){
        Swal.fire({
          title: 'Info',
          text: err['message'],
          icon: 'info',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/register');
          }
        })
      }
    }
      console.log(error);
    })
  }else{
    this.teamtwoimageshow = false;
    this.teamtwoimageinputshow = true;
    this.teamtwoimage_url = '';
    this.addMatchResultForm.get('team_two_image').setValidators(Validators.required);
    this.addMatchResultForm.get('team_two_image').updateValueAndValidity();
    this.matsr.deletematch('deletematchresultimage/'+this.teamoneimage_name).then(res => {
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Deleted',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/register');
          }
        })

      }
    }, error => {
      let err = error['error'];
      if(error['status'] == 401){
    if(err['status'] == 'faile'){
        Swal.fire({
          title: 'Info',
          text: err['message'],
          icon: 'info',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/register');
          }
        })
      }
    }
      console.log(error);
    })
  }
}

}
