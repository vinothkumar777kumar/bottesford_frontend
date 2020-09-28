import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  logininfo:any;
  constructor(private ds: DataserviceService) { 
    
  }
  getplayerimageAPI(): string {
    console.log(sessionStorage.getItem('player_image_url'));
    return sessionStorage.getItem('player_image_url');
  }
  addteam(data: any) {
    return this.ds.apipostRecords('addteam',data).then(res => res);
  }

  getdata(service:any){
    return this.ds.getmethod(service).then(res => res);
  }

  getusersdata(service:any){
    return this.ds.getmethod(service).then(res => res);
  }

  editteam(id:any){
    return this.ds.getmethod(id).then(res => res);
  }
  updateteam(data:any){
    return this.ds.apipostRecords('updateteam', data).then(res => res);
  }

  delete(id:any){
    return this.ds.getmethod(id).then(res => res);
  }

  postmethode(service:any,data: any,isFileUpload=false){
    return this.ds.apipostRecords(service,data,isFileUpload).then(res => res);
  }


}
