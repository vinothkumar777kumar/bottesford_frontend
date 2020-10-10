import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  logininfo:any;
  constructor(private ds: DataserviceService) { }

  getblogimageAPI(): string {
    console.log(sessionStorage.getItem('blog_image_url'));
    return sessionStorage.getItem('blog_image_url');
  }
  addblog(data: any) {
    return this.ds.apipostRecords('addblog',data).then(res => res);
  }

  getblog(service:any){
    return this.ds.getmethod(service).then(res => res);
  }

  editblog(id:any){
    return this.ds.getmethod(id).then(res => res);
  }
  updateblog(data:any){
    return this.ds.apipostRecords('updateblog', data).then(res => res);
  }

  deleteblog(id:any){
    return this.ds.getmethod(id).then(res => res);
  }

  postmethode(service:any,data: any,isFileUpload:boolean){
    alert('test');
    return this.ds.apipostRecords(service,data,isFileUpload).then(res => res);
  }

}
