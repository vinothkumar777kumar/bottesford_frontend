import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {
  constructor(private ds: DataserviceService) { }

  getdata(service:any){
   
    return this.ds.getmethod(service).then(res => res);
  }

  updatemyaccount(service:any,data:any){
    return this.ds.apipostRecords(service, data).then(res => res);
  }

  updatepasswoed(service:any,data:any){
    return this.ds.apipostRecords(service, data).then(res => res);
  }

  bookhall(service:any,data:any){
    return this.ds.apipostRecords(service, data).then(res => res);
  }


}
