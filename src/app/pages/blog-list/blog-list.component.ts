import { Component, OnInit,Input,OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { BlogService } from 'src/app/dataservice/blog.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnDestroy, OnInit {
  
  @Input() headerClass: string;
  public cardRemove: string;
  @Input() cardClass: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  blogarray = [];
  emptyblogarray:boolean = false;
  constructor(private toastr: ToastrService,private router: Router,private blogs:BlogService) {
    this.getblog_data();
  }

  ngOnInit(): void {
  }

  getblog_data(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.blogs.getblog('getallblog').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptyblogarray = true;
    }else{
      data.forEach(b => {
        this.blogarray.push({id:b.id,title:b.title,publish_date:b.publish_date,
          status:b.status});
      });
      this.dtTrigger.next();
  
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

  edit_blog(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/add-blog'], navigationExtras);
  }

  delete_blog(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this blog?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blogs.deleteblog('deleteblog/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.blogarray = [];
               this.getblog_data();                  
          this.router.navigateByUrl('blog-list', { skipLocationChange: true }).then(() => {
            this.router.navigate(['blog-list']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('blog-list');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('team-list');
      }
    })
    
  
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }

}
