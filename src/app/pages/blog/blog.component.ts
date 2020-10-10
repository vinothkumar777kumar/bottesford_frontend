import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  emptyblogarray:boolean = false;
  blogarray = [];
  blog_image_api:any;
  constructor(private toastr: ToastrService,private router: Router,private blogs:BlogService) {
    this.blog_image_api = this.blogs.getblogimageAPI();
    this.getblog_data();
   }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

  getblog_data(){
    this.blogs.getblog('getallblog').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyblogarray = true;
    }else{
      data.forEach(b => {
        let pd = moment(b.publish_date,'DD-MM-YYYY').format('D MMM YYYY');
        let sd = pd.split(' ');
        this.blogarray.push({id:b.id,title:b.title,publish_date:b.publish_date,
          status:b.status,blog_image:this.blog_image_api+''+b.blog_image,date:sd[0],month:sd[1],year:sd[2]});
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

  singleblog(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/blog-single'], navigationExtras);
  }

}
