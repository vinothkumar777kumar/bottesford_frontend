import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TeamService } from 'src/app/dataservice/team.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection, AngularMyDatePickerDirective} from 'angular-mydatepicker';

@Component({
  selector: 'app-manager-addteam-players',
  templateUrl: './manager-addteam-players.component.html',
  styleUrls: ['./manager-addteam-players.component.css']
})
export class ManagerAddteamPlayersComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  imageinput:boolean = true;
  playerimageshow:boolean = false;
  submitted = false;
  addPlayerForm:FormGroup;
  title = "Add Player";
  submit_action = "Add Player";
  public date = new Date(); 
  file :any = [];
  teamsarray = [];
  player_id:any;
  player_image_api:any;
  playerimage_name:any;
playerimage_url:any;
mySubscription: any;
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{dates: [{year: 1885, month: 1, day: 1}, {year: 2011, month: 1, day: 1}], styleClass: 'yoga'}],
    disableUntil: {day:1,month: 1,year: 1985}
  };
  public myDatePickerOptions1: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableUntil: {day: 1,month: 1,year: 1985}
  };
  constructor(private toastr: ToastrService,private ngxService: NgxUiLoaderService,private router: Router,
    private tmsv:TeamService,private fb: FormBuilder,private Activate: ActivatedRoute) {
      console.log(localStorage.getItem('team_id'))
      this.addPlayerForm = this.fb.group({
        id:[''],
        player_name:['',Validators.required],
        player_image:['',Validators.required],
        position:['',Validators.required],
        squad_no:['',Validators.required],
        dateofbirth:['',Validators.required],
        player_height:['',Validators.required],
        signed_date:['',Validators.required],
        country:['',Validators.required],
        description:['',Validators.required]
      });
      this.player_image_api = this.tmsv.getplayerimageAPI();
      this.Activate.queryParams.subscribe(res => {
        this.player_id = res.player_id;
        if(this.player_id){
          this.title = "Edit Player";
          this.submit_action = "Update";
          this.imageinput = false;
          this.playerimageshow = true;
          this.tmsv.editteam('editteamplayer/'+res.player_id).then(res => {
            console.log(res);
            if(res['status'] == 'success'){
              let data = res['data'][0];
              console.log(data);
             
              this.addPlayerForm.controls['id'].setValue(data.id);
              this.addPlayerForm.get('player_image').clearValidators();
                this.addPlayerForm.get('player_image').updateValueAndValidity();
              this.playerimage_name = data.player_image;;
              this.playerimage_url = this.player_image_api+''+data.player_image;
              let dob = data.dateofbirth.split('-');
              let sigd = data.signed_date.split('-');
            let dof = dob[0] +'-'+dob[1]+'-'+dob[2];
            let sisd = sigd[0] +'-'+sigd[1]+'-'+sigd[2];
            let rplace = /^0+/;
            let dod = dob[0].replace(rplace,'');
            let dom = dob[1].replace(rplace,'');
            let sid = sigd[0].replace(rplace,'');
            let sim = sigd[1].replace(rplace,'');
             
              if (Number(dod) - 1 == 0) {
                let actualDate = new Date(Number(new Date(dob[2] + "-" + dom + "-" + dod)) - 1);
                this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
                this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
                this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
              } else {
                this.myDatePickerOptions.disableUntil.day = Number(dod) - 1;
                this.myDatePickerOptions.disableUntil.month = Number(dom);
                this.myDatePickerOptions.disableUntil.year = Number(dob[2]);
              }
              this.addPlayerForm.controls['dateofbirth'].setValue({isRange: false, singleDate: {date: { 
                year: dob[2], 
                month: dom, 
                day: dod
              }}});
              if (Number(sid) - 1 == 0) {
                let actualDate = new Date(Number(new Date(sigd[2] + "-" + sim + "-" + sid)) - 1);
                this.myDatePickerOptions1.disableUntil.day = actualDate.getDate();
                this.myDatePickerOptions1.disableUntil.month = actualDate.getMonth() + 1;
                this.myDatePickerOptions1.disableUntil.year = actualDate.getFullYear();
              } else {
                this.myDatePickerOptions1.disableUntil.day = Number(sid) - 1;
                this.myDatePickerOptions1.disableUntil.month = Number(sim);
                this.myDatePickerOptions1.disableUntil.year = Number(sigd[2]);
              }
              this.addPlayerForm.controls['signed_date'].setValue({isRange: false, singleDate: {date: { 
                year: sigd[2], 
                month: sim, 
                day: sid
              }}});
              this.addPlayerForm.controls['player_name'].setValue(data.player_name);
              this.addPlayerForm.controls['position'].setValue(data.position);
              this.addPlayerForm.controls['squad_no'].setValue(data.squad_no);
              this.addPlayerForm.controls['player_height'].setValue(data.player_height);
              this.addPlayerForm.controls['country'].setValue(data.country);
              this.addPlayerForm.controls['description'].setValue(data.description);
            }
          });
        }else{
          this.title = 'Add Player';
          this.submit_action = "Add Player";
          this.imageinput = true;
          this.playerimageshow = false;
        }
      });
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
  
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
     }

  ngOnInit(): void {
    this.addPlayerForm.controls['signed_date'].setValue({isRange: false, singleDate: {date: { 
      year: this.date.getFullYear(), 
      month: this.date.getMonth()+1, 
      day: this.date.getDate()
    }}});
  }

  // convenience getter for easy access to form fields
  get f() { return this.addPlayerForm.controls; }

  fileProgress(fileInput: any) {
    console.log(fileInput)
    let fileData = fileInput.target.files[0];
    this.file=fileData;
    // let arr = fileData.split('/'); 
    console.log(this.file);
  }

  async   addplayers(){
    this.submitted = true;
    if(this.addPlayerForm.invalid){
      console.log(this.addPlayerForm.value);
      
      return;
    }else{
      console.log(this.addPlayerForm.value);
      if(this.addPlayerForm.value.id){
        console.log(this.addPlayerForm.value);
        console.log(this.file);
      
        let dob = this.addPlayerForm.value.dateofbirth;
      
        let pd = dob.singleDate.date;
    let d= (pd.day < 10 ? '0' : '')+(pd.day);
    let m = (pd.month < 10 ? '0' : '')+(pd.month);
    // console.log(dob);
        this.addPlayerForm.controls['dateofbirth'].setValue(d+'-'+m+'-'+pd.year);

        let sigd = this.addPlayerForm.value.signed_date;
      
        let sd1 = sigd.singleDate.date;
    let d1= (sd1.day < 10 ? '0' : '')+(sd1.day);
    let m1 = (sd1.month < 10 ? '0' : '')+(sd1.month);
    // console.log(dob);
        this.addPlayerForm.controls['signed_date'].setValue(d1+'-'+m1+'-'+sd1.year);
        const myFormData = new FormData();
        let image = await this.urlToObject(this.playerimage_name);
console.log(image);
        if (this.file == '') {
      
          myFormData.append('image',this.playerimage_name);
        } else {
          myFormData.append('image', this.file, this.file.name);
        }
        myFormData.append('team_name',  localStorage.getItem('team_id'));
        myFormData.append('description',  this.addPlayerForm.value.description);
        myFormData.append('player_name', this.addPlayerForm.value.player_name);
        myFormData.append('position', this.addPlayerForm.value.position);
        myFormData.append('squad_no', this.addPlayerForm.value.squad_no);
        myFormData.append('dateofbirth', this.addPlayerForm.value.dateofbirth);
        myFormData.append('signed_date', this.addPlayerForm.value.signed_date);
        myFormData.append('player_height', this.addPlayerForm.value.player_height);
        myFormData.append('country', this.addPlayerForm.value.country);
        // myFormData.append('status', '0');
        this.ngxService.start();
        this.tmsv.postmethode('updateteamplayer/'+this.addPlayerForm.value.id,myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/manager-team-players');
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
        let dob = this.addPlayerForm.value.dateofbirth;
      
        let pd = dob.singleDate.date;
    let d= (pd.day < 10 ? '0' : '')+(pd.day);
    let m = (pd.month < 10 ? '0' : '')+(pd.month);
    console.log(dob);
        this.addPlayerForm.controls['dateofbirth'].setValue(d+'-'+m+'-'+pd.year);

        let sigd = this.addPlayerForm.value.signed_date;
      
        let sd1 = sigd.singleDate.date;
    let d1= (sd1.day < 10 ? '0' : '')+(sd1.day);
    let m1 = (sd1.month < 10 ? '0' : '')+(sd1.month);
    console.log(dob);
        this.addPlayerForm.controls['signed_date'].setValue(d1+'-'+m1+'-'+sd1.year);
        const myFormData = new FormData();
        // let image = await this.urlToObject(this.blog_image_name);

        if (this.file == '') {
          // myFormData.append('image', image, this.blog_image_name);
        } else {
          myFormData.append('image', this.file, this.file.name);
        }
        myFormData.append('team_name',  localStorage.getItem('team_id'));
        myFormData.append('description',  this.addPlayerForm.value.description);
        myFormData.append('player_name', this.addPlayerForm.value.player_name);
        myFormData.append('position', this.addPlayerForm.value.position);
        myFormData.append('squad_no', this.addPlayerForm.value.squad_no);
        myFormData.append('dateofbirth', this.addPlayerForm.value.dateofbirth);
        myFormData.append('signed_date', this.addPlayerForm.value.signed_date);
        myFormData.append('player_height', this.addPlayerForm.value.player_height);
        myFormData.append('country', this.addPlayerForm.value.country);
        // console.log(this.file);
        this.ngxService.start();
        this.tmsv.postmethode('addplayer',myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Success',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/manager-team-players');
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
      this.addPlayerForm.controls['dateofbirth'].setValue(event.singleDate.formatted);
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
        this.myDatePickerOptions1.disableUntil.day = actualDate.getDate();
        this.myDatePickerOptions1.disableUntil.month = actualDate.getMonth() + 1;
        this.myDatePickerOptions1.disableUntil.year = actualDate.getFullYear();
      } else {
        this.myDatePickerOptions1.disableUntil.day = Number(start_date.day) - 1;
        this.myDatePickerOptions1.disableUntil.month = Number(start_date.month);
        this.myDatePickerOptions1.disableUntil.year = Number(start_date.year);
      }
      // this.addcouponform.controls['valid_to'].setValue({isRange: false, singleDate: {date: { 
      //   year: start_date.year,
      //   month: start_date.month, 
      //   day: start_date.day
      // }}});
    }else if(text_date == 'signeddate'){
      this.addPlayerForm.controls['signed_date'].setValue(event.singleDate.formatted);
      let end_date = event['singleDate'].date;
      //   this.myDatePickerOptions = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:end_date.day - 1,month: end_date.month,year: end_date.year}
      //  };
      //  this.addcouponform.controls['valid_from'].setValue({isRange: false, singleDate: {date: { 
      //   year: end_date.year,
      //   month: end_date.month, 
      //   day: end_date.day
      // }}});
    //  let start_date = this.addcampform.controls['start_date'].value
      // let start_time = this.addcampform.controls['start_time'].value;
      // let end_time = this.addcampform.controls['end_time'].value;
      // if((start_time == '' || start_time == null) && (end_time == '' || end_time == null)){
  
        // Swal.fire('Error','Please Select Camp Start Time and End Time', 'error');
        // setTimeout(() => {
          // this.addcampform.controls['start_time'].reset();
          // this.addcampform.controls['end_time'].reset();
          // this.addcampform.controls['start_date'].reset();
          // this.addcampform.controls['end_date'].reset();
  //       },1000);
  //       return;
  //   }else if(start_date == '' || start_date == null){
  //     Swal.fire('Error','Please Select Camp start date', 'error');
  //       setTimeout(() => {
  //         this.addcampform.controls['start_time'].reset();
  //         this.addcampform.controls['end_time'].reset();
  //         this.addcampform.controls['end_date'].reset();
  //       },1000);
  //       return;
  //   }else{
  //     this.isselectcampdate = true;
  //     let sd = this.addcampform.controls['start_date'].value;
  //     let start_date = sd.singleDate.jsDate;
  //     let end_date = event.singleDate.jsDate;
  //    let array_date =  this.getDateArray(new Date(moment(start_date).format('YYYY-MM-DD')),new Date(moment(end_date).format('YYYY-MM-DD')));
  //    let datetime = [];
  //    array_date.forEach(e => {
  //      console.log(this.starttime + this.endtime);
  //  datetime.push({date:e,start_time:this.starttime,end_time: this.endtime})
  //    })
  //    this.addcampform.addControl('selecteddate', new FormArray([ ]));   
  //    let selectdate = this.addcampform.get('selecteddate') as FormArray;
  //    datetime.forEach(date => {
  //      console.log(date);
  //      selectdate.push(
  //        this.fb.group({
  //          date: new FormControl(date.date),
  //          select_start_time:new FormControl(date.start_time),
  //          select_end_time: new FormControl(date.end_time)
  //        })
  //      )
  //    });
  //    console.log(this.addcampform.value);
  //  this.selectedcamparray_date = array_date;
    // });
  }
  
  
  }

  
urlToObject = async (imageName) => {
  const response = await fetch((this.player_image_api + imageName),{
   
    mode: "no-cors"
    // body: formData
  })
  if(response.ok) {
    const blob = await response.blob();
    // console.log(blob)
    // const file = new File([blob], imageName, {type: blob.type});
    return blob;
  } else {
    return null;
  }
}

  deleteplayerImage(){
    this.playerimageshow = false;
    this.imageinput = true;
    this.playerimage_url = '';
    this.addPlayerForm.get('player_image').setValidators(Validators.required);
    this.addPlayerForm.get('player_image').updateValueAndValidity();
    this.tmsv.delete('deleteplayerimage/' + this.playerimage_name).then(res => {
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Deleted',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/manager-team-players');
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
            this.router.navigateByUrl('/manager-team-players');
          }
        })
      }
    }
      console.log(error);
    })
  }

 

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }



}
