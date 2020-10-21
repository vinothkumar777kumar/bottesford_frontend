import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BlogService } from 'src/app/dataservice/blog.service';
import {IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection, AngularMyDatePickerDirective} from 'angular-mydatepicker';
import { TeamService } from 'src/app/dataservice/team.service';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { error } from 'protractor';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;
  addBlogForm: FormGroup;
  submitted = false;
  blogid:any;
  title = "Add Blog";
  submit_action = "Save";
  blogimageinput:boolean = true;
  blogimageshow:boolean = false;
  blogimage_url:any;
  file :any = [];
  blogimage_name:any;
  blog_image_api:any;
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{dates: [{year: 1885, month: 1, day: 1}, {year: 2011, month: 1, day: 1}], styleClass: 'yoga'}],
    disableUntil: {day:1,month: 1,year: 1985}
  };
  constructor(private Activate: ActivatedRoute,private toastr: ToastrService,private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,private router: Router,private blogs:BlogService,private ds: DataserviceService) {
      this.blog_image_api = this.blogs.getblogimageAPI();
      this.Activate.queryParams.subscribe(res => {
        this.blogid = res.id;
        console.log( this.blogid, 'blog_id');
        if(this.blogid){
          this.title = "Edit Blog";
          this.submit_action = "Update";
          this.blogimageinput = false;
          this.blogimageshow = true;
          this.blogs.editblog('editblog/'+res.id).then(res => {
            console.log(res);
            if(res['status'] == 'success'){
              let data = res['data'][0];
              console.log(data);
             
              this.addBlogForm.controls['id'].setValue(data.id);
              this.addBlogForm.controls['description'].setValue(data.description);
              this.addBlogForm.controls['title'].setValue(data.title);
              this.addBlogForm.get('blog_image').clearValidators();
          this.addBlogForm.get('blog_image').updateValueAndValidity();
          this.blogimage_name = data.blog_image;
          this.blogimage_url = this.blog_image_api+''+data.blog_image;
          // let img = this.urlToObject(data.blog_image)
          // console.log(img,'api blog image url');
          let pubd = data.publish_date.split('-');
      let splidate = pubd[0] +'-'+pubd[1]+'-'+pubd[2];
      let rplace = /^0+/;
      let pd = pubd[0].replace(rplace,'');
      let pm = pubd[1].replace(rplace,'');
       
        if (Number(pd) - 1 == 0) {
          let actualDate = new Date(Number(new Date(pubd[2] + "-" + pm + "-" + pd)) - 1);
          this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
          this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
          this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
        } else {
          this.myDatePickerOptions.disableUntil.day = Number(pd) - 1;
          this.myDatePickerOptions.disableUntil.month = Number(pm);
          this.myDatePickerOptions.disableUntil.year = Number(pubd[2]);
        }
        this.addBlogForm.controls['publish_date'].setValue({isRange: false, singleDate: {date: { 
          year: pubd[2], 
          month: pm, 
          day: pd
        }}});
              this.addBlogForm.controls['status'].setValue(data.status);
            }
          });
        
        }else{
          this.title = 'Add Blog';
          this.submit_action = "Save";
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
     }

  ngOnInit(): void {
    this.addBlogForm = this.fb.group({
      id:[''],
      blog_image:['',Validators.required],
      title:['',Validators.required],
      publish_date:['',Validators.required],
      description:['',Validators.required],
      status:[1]
    })
  }

   // convenience getter for easy access to form fields
   get f() { return this.addBlogForm.controls; }

   fileProgress(fileInput: any) {
    console.log(fileInput)
    let fileData = fileInput.target.files[0];
    this.file=fileData;
    // let arr = fileData.split('/'); 
    console.log(this.file);
  }

  addblog(){
    this.submitted = true;
    if(this.addBlogForm.invalid){      
      return;
    }else{
      console.log(this.addBlogForm.value);
      if(this.addBlogForm.value.id){
        console.log(this.addBlogForm.value);
        console.log(this.file);
      
        let pubd = this.addBlogForm.value.publish_date;
      
        let pd = pubd.singleDate.date;
    let d= (pd.day < 10 ? '0' : '')+(pd.day);
    let m = (pd.month < 10 ? '0' : '')+(pd.month);
    // console.log(dob);
        this.addBlogForm.controls['publish_date'].setValue(d+'-'+m+'-'+pd.year);
        const myFormData = new FormData();

        if (this.file == '') {
      
          myFormData.append('blog_image',this.blogimage_name);
        } else {
          myFormData.append('blog_image', this.file, this.file.name);
        }
        myFormData.append('title',  this.addBlogForm.value.title);
        myFormData.append('publish_date',  this.addBlogForm.value.publish_date);
        myFormData.append('description',  this.addBlogForm.value.description);
        myFormData.append('status', this.addBlogForm.value.status);
        this.ngxService.start();
        this.ds.apipostRecords('updateblog/'+this.addBlogForm.value.id,myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/blog-list');
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
        let pubd = this.addBlogForm.value.publish_date;
      
        let pd = pubd.singleDate.date;
    let d= (pd.day < 10 ? '0' : '')+(pd.day);
    let m = (pd.month < 10 ? '0' : '')+(pd.month);
        this.addBlogForm.controls['publish_date'].setValue(d+'-'+m+'-'+pd.year);
        const myFormData = new FormData();

        if (this.file == '') {
          // myFormData.append('image', image, this.blog_image_name);
        } else {
          myFormData.append('blog_image', this.file, this.file.name);
        }
        // console.log(myFormData.get('image'));
        myFormData.append('title',  this.addBlogForm.value.title);
        myFormData.append('publish_date',  this.addBlogForm.value.publish_date);
        myFormData.append('description',  this.addBlogForm.value.description);
        myFormData.append('status', this.addBlogForm.value.status);
        // console.log(this.file);
        this.ngxService.start();
        this.ds.apipostRecords('addblog',myFormData,true).then(res => {
          this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Success',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/blog-list');
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
    if(text_date == 'publishdate'){
      this.addBlogForm.controls['publish_date'].setValue(event.singleDate.formatted);
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
    }else if(text_date == 'signeddate'){
      this.addBlogForm.controls['publish_date'].setValue(event.singleDate.formatted);
      let end_date = event['singleDate'].date;
    
  }
  
  
  }

  urlToObject = async (imageName) => {
    const response = await fetch((this.blog_image_api + imageName),{
     
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

  deleteblogImage(){
    this.blogimageshow = false;
    this.blogimageinput = true;
    this.blogimage_url = '';
    this.addBlogForm.get('blog_image').setValidators(Validators.required);
    this.addBlogForm.get('blog_image').updateValueAndValidity();
    this.blogs.deleteblog('deleteblogimage/' + this.blogimage_name).then(res => {
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Deleted',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/add-blog');
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
