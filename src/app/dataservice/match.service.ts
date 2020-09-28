import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private ds: DataserviceService) { }
  getmatchimageAPI(): string {
    console.log(sessionStorage.getItem('match_image_url'));
    return sessionStorage.getItem('match_image_url');
  }

  getdata(service:any){
    return this.ds.getmethod(service).then(res => res);
  }
  addmatch(data: any) {
    return this.ds.apipostRecords('addmatch',data).then(res => res);
  }


  editmatch(id:any){
    return this.ds.getmethod(id).then(res => res);
  }
  updatematch(data:any){
    return this.ds.apipostRecords('updatematch', data).then(res => res);
  }

  deletematch(id:any){
    return this.ds.getmethod(id).then(res => res);
  }

  postmethode(service:any,data: any,isFileUpload=false){
    return this.ds.apipostRecords(service,data,isFileUpload).then(res => res);
  }
}
