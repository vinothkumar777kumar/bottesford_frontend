import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/dataservice/blog.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import * as moment from 'moment';

declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})

export class BlogSingleComponent implements OnInit {
  blog_image_api:any;
  blogid:any;
  blogarray = [];
  emptyrecentblogarray:boolean = false;
  blogsingledata = {
    title:'',
    description:'',
    publish_date:'',
    blog_image:''
  }
  constructor(private Activate: ActivatedRoute,private toastr: ToastrService,private router: Router,
    private blogs:BlogService) {
    this.blog_image_api = this.blogs.getblogimageAPI();
      this.Activate.queryParams.subscribe(res => {
     this.blogid = res.id;
        if(this.blogid){
          this.blogs.editblog('editblog/'+res.id).then(res => {
            console.log(res);
            if(res['status'] == 'success'){
              let data = res['data'][0];
              this.blogsingledata.blog_image = this.blog_image_api+''+data.blog_image;
              this.blogsingledata.title = data.title;
              this.blogsingledata.description = data.description;
              this.blogsingledata.publish_date = data.publish_date;
     
  
        }else{
          
        }
      });
    }
   });
  }

  ngOnInit(): void {
    this.getblog_data();
  }

  getblog_data(){
    this.blogs.getblog('getallblog').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyrecentblogarray = true;
    }else{
      data.forEach(b => {
        let pd = moment(b.publish_date,'DD-MM-YYYY').format('z');
        let date = new Date(pd);
        console.log(pd);
        this.blogarray.push({id:b.id,title:b.title,publish_date:b.publish_date,
          status:b.status,blog_image:this.blog_image_api+''+b.blog_image});
      })
      console.log(this.blogarray);
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

}
