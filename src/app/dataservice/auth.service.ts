import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiconfigService } from './apiconfig.service';
import { catchError, retry, tap, debounceTime } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { register } from '../entities/register.entity';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _URL: string = "";
  logininfo:any;
  constructor(private http:HttpClient,private apiser: DataserviceService) { }

  register(data: register) {
   
    return this.apiser.postmethod('register',data).then(res => res);
    
  }

  login(data) {
   
    return this.apiser.postmethod('userlogin',data).then(res => res);
    
  }

  seesionuser_info(res){
    sessionStorage.setItem('login_details',JSON.stringify(res));
}
}
