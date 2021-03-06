import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection, AngularMyDatePickerDirective} from 'angular-mydatepicker';
import { MatchService } from 'src/app/dataservice/match.service';
import { error } from 'protractor';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  imageinput:boolean = true;
  teamoneimageinputshow:boolean = true;
  teamoneimageshow:boolean = false;
  teamtwoimageinputshow:boolean = true;
  teamtwoimageshow:boolean = false;
  submitted = false;
  addMatchForm:FormGroup;
  title = "Add match";
  submit_action = "Add Match";
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
  endtime:any;
  starttime:any;
public myDatePickerOptions: IAngularMyDpOptions = {
  dateRange: false,
  dateFormat: 'dd-mm-yyyy',
  disableDates: [{dates: [{year: 1885, month: 1, day: 1}, {year: 2011, month: 1, day: 1}], styleClass: 'yoga'}],
  disableUntil: {day: this.date.getDate()-1,month: this.date.getMonth()+1,year: this.date.getFullYear()}
};
  constructor(private toastr: ToastrService,private ngxService: NgxUiLoaderService,private router: Router,
    private matsr:MatchService,private fb: FormBuilder,private Activate: ActivatedRoute) {
      this.addMatchForm = this.fb.group({
        id:[''],
        team_one:['',Validators.required],
        team_one_image:['',Validators.required],
        team_two:['',Validators.required],
        team_two_image:['',Validators.required],
        match_name:['',Validators.required],
        round:['',Validators.required],
        match_date:['',Validators.required],
        start_time:['',Validators.required],
        end_time:['',Validators.required],
        ticket_price:['',Validators.required]
      });
        
      this.getteams_data();
      this.match_image_api = this.matsr.getmatchimageAPI();
    this.Activate.queryParams.subscribe(res => {
      this.match_id = res.match_id;
      if(this.match_id){
        this.title = "Edit match";
        this.submit_action = "Update";
        this.teamoneimageinputshow = false;
        this.teamoneimageshow = true;
        this.teamtwoimageinputshow = false;
        this.teamtwoimageshow = true;
      }else{
        this.title = 'Add Match';
        this.submit_action = "Add Match";
        this.teamoneimageinputshow = true;
        this.teamoneimageshow = false;
        this.teamtwoimageinputshow = true;
        this.teamtwoimageshow = false;
      }
    this.matsr.editmatch('editmatch/'+res.match_id).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'];
        console.log(data);
       
        this.addMatchForm.controls['id'].setValue(data.id);
        this.addMatchForm.controls['team_one'].setValue(data.team_one);
        this.addMatchForm.get('team_one_image').clearValidators();
          this.addMatchForm.get('team_one_image').updateValueAndValidity();

          this.addMatchForm.controls['team_two'].setValue(data.team_two);
          this.addMatchForm.get('team_two_image').clearValidators();
            this.addMatchForm.get('team_two_image').updateValueAndValidity();
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
          this.myDatePickerOptions.disableUntil.day = Number(md) - 1;
          this.myDatePickerOptions.disableUntil.month = Number(mm);
          this.myDatePickerOptions.disableUntil.year = Number(matcd[2]);
        }
        this.addMatchForm.controls['match_date'].setValue({isRange: false, singleDate: {date: { 
          year: matcd[2], 
          month: mm, 
          day: md
        }}});
     
        this.addMatchForm.controls['match_name'].setValue(data.match_name);
        this.addMatchForm.controls['round'].setValue(data.round);
        this.starttime = data.start_time;
        this.endtime = data.end_time;
        let start_time = this.getTwentyFourHourTime(data.start_time);
        let end_time = this.getTwentyFourHourTime(data.end_time);
      let split_st= start_time.split(':');
      let split_et = end_time.split(':');
      let s_t = split_st[0].toString()
      let s_m = split_st[1].toString();

      let e_t = split_et[0].toString()
      let e_m = split_et[1].toString();

      if(s_t < '10'){s_t = '0'+split_st[0];}else{s_t = ''+split_st[0];}
      if(s_m < '10'){ s_m = '0'+split_st[1];}else{s_m = ''+split_st[1];}

      if(e_t < '10'){e_t = '0'+split_et[0];}else{e_t = ''+split_et[0];}
      if(e_m < '10'){ e_m = '0'+split_et[1];}else{e_m = ''+split_et[1];}

        console.log(s_t,s_m);
        this.addMatchForm.controls['start_time'].setValue(s_t+':'+s_m);
        this.addMatchForm.controls['end_time'].setValue(e_t+':'+e_m);
        this.addMatchForm.controls['ticket_price'].setValue(data.ticket_price);
      }
    },error => {
      if(error['status'] == 401){
        let er = error['error'];
        this.toastr.error(er.message, er.error, {
          progressBar:true
        });
        return;
      }
    });
    });
     }

  ngOnInit(): void {
  }

  getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/1/2013 " + amPmString); 
    return d.getHours() + ':' + d.getMinutes(); 
}

   // convenience getter for easy access to form fields
   get f() { return this.addMatchForm.controls; }

   getteams_data(){
    this.matsr.getdata('getteams').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
// this.emptyteams = true;
    }else{
      data.forEach(t => {
        this.teamsarray.push({id:t.id,team_name:t.team_name,status:t.status});
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

  addmatch(){
    this.submitted = true;
    console.log(this.addMatchForm.value) ;
    if(this.addMatchForm.invalid){     
      console.log(this.addMatchForm.value) ;
      return;
    }else{
      console.log(this.addMatchForm.value);
      if(this.addMatchForm.value.id){
        console.log(this.addMatchForm.value);
        console.log(this.file);
        if(this.addMatchForm.value.ticket_price <= 0 ){
          this.toastr.error("Ticket Price Should be greater than 0.", 'Error', {
            progressBar:true
          });
          return;
        }
      
        let matchdate = this.addMatchForm.value.match_date;
        let md = matchdate.singleDate.date;
    let d= (md.day < 10 ? '0' : '')+(md.day);
    let m = (md.month < 10 ? '0' : '')+(md.month);
    // console.log(dob);
        this.addMatchForm.controls['match_date'].setValue(d+'-'+m+'-'+md.year);
        const myFormData = new FormData();
        myFormData.append('id',  this.addMatchForm.value.id);
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
      
      myFormData.append('team_one',  this.addMatchForm.value.team_one);
      myFormData.append('team_two',  this.addMatchForm.value.team_two);
      myFormData.append('match_name',  this.addMatchForm.value.match_name);
      myFormData.append('round',  this.addMatchForm.value.round);
      myFormData.append('match_date',  this.addMatchForm.value.match_date);
      myFormData.append('start_time',  this.starttime);
      myFormData.append('end_time',  this.endtime);
      myFormData.append('ticket_price',  this.addMatchForm.value.ticket_price);
      console.log(this.starttime,'start time');
      console.log(this.endtime,'end time');
        this.ngxService.start();
        this.matsr.postmethode('updatematch',myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/match-list');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
          }
    },error => {
      this.ngxService.stop();
      if(error['status'] == 401){
        let er = error['error'];
        this.toastr.error(er.message, er.error, {
          progressBar:true
        });
        return;
      }
  
    });
      }else{
        if(this.addMatchForm.value.ticket_price <= 0 ){
          this.toastr.error("Ticket Price Should be greater than 0.", 'Error', {
            progressBar:true
          });
          return;
        }
        let matchd = this.addMatchForm.value.match_date;
      
        let md = matchd.singleDate.date;
    let d= (md.day < 10 ? '0' : '')+(md.day);
    let m = (md.month < 10 ? '0' : '')+(md.month);
        this.addMatchForm.controls['match_date'].setValue(d+'-'+m+'-'+md.year);
        const myFormData = new FormData();
       
          myFormData.append('team_one_image', this.file, this.file.name);
          myFormData.append('team_two_image', this.file1, this.file1.name);
        
        myFormData.append('team_one',  this.addMatchForm.value.team_one);
        myFormData.append('team_two',  this.addMatchForm.value.team_two);
        myFormData.append('match_name',  this.addMatchForm.value.match_name);
        myFormData.append('round',  this.addMatchForm.value.round);
        myFormData.append('match_date',  this.addMatchForm.value.match_date);
        myFormData.append('start_time',  this.starttime);
        myFormData.append('end_time',  this.endtime);
        myFormData.append('ticket_price',  this.addMatchForm.value.ticket_price);
        console.log(this.starttime,'start time');
        console.log(this.endtime,'end time');
        this.ngxService.start();
        this.matsr.postmethode('addmatch',myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Success',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/match-list');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
          }
    },error => {
      this.ngxService.stop();
      if(error['status'] == 401){
        let er = error['error'];
        this.toastr.error(er.message, er.error, {
          progressBar:true
        });
        return;
      }
    });
      }
 
    }
   }

   onDateChanged(event,text_date) {
    // let {date, jsDate, formatted, epoc} = event.singleDate;
    // console.log(event['singleDate'])
    if(text_date == 'changedate'){
      this.addMatchForm.controls['match_date'].setValue(event.singleDate.formatted);
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
    this.addMatchForm.get('team_one_image').setValidators(Validators.required);
    this.addMatchForm.get('team_one_image').updateValueAndValidity();
    this.matsr.deletematch('deletematchimage/'+this.teamoneimage_name).then(res => {
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
    this.addMatchForm.get('team_two_image').setValidators(Validators.required);
    this.addMatchForm.get('team_two_image').updateValueAndValidity();
    this.matsr.deletematch('deletematchimage/'+this.teamoneimage_name).then(res => {
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

onTimeChange(event,texttime){
  if(texttime == 'start_time'){
    var inputEle = document.getElementById('start_time');
    var timeSplit = event.target.value.split(':'),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  this.starttime = hours + ':' + minutes+' '+meridian;
  // console.log(this.starttime +'start time');
  // this.starttime = hours + ':' + minutes;
  }else{
    var inputEle = document.getElementById('end_time');
    var timeSplit = event.target.value.split(':'),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  console.log(hours + ':' + minutes);
  this.endtime = hours + ':' + minutes+' '+meridian;
  // console.log(this.endtime +'end time');
  }
}

numberOnly(evt): boolean {
  // const charCode = (event.which) ? event.which : event.keyCode;
  // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //   return false;
  // }
  // return true;

  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
    return false;


}

}
