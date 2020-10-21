import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiconfigService } from './apiconfig.service';
import { catchError, retry, tap, debounceTime } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public _URL: string = "";
  logininfo:any;
  constructor(private http:HttpClient,private apiser: ApiconfigService,private router: Router) { 
    // alert('test');
  }

  getServiceAPI(): string {
    console.log(sessionStorage.getItem('api_url'));
    return sessionStorage.getItem('api_url');
  }

  

  postmethod(Service: string, data: any) {
    this._URL = this.getServiceAPI();
    let httpOptions;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    let headers = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    let URL = this._URL + Service;
   
    return this.http.post(URL, data, headers).toPromise().then(res => res);
    
  }

  apipostRecords(Service: string, data: any,isFileUpload=false) {
    this._URL = this.getServiceAPI();
    let httpOptions;
    if(sessionStorage.getItem('login_details')){
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    }
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    let headers = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', this.logininfo['token'])
      }
    let URL = this._URL + Service;
    if(isFileUpload){
      httpOptions = {
        headers: new HttpHeaders({
        }).set('Authorization',this.logininfo['token'])
      }
      return this.http.post(URL, data,httpOptions).toPromise().then(res => res);
  
    }else{
    return this.http.post(URL, data, headers).toPromise().then(res => res);
    }
    
  }

  getmethod(Service: string) {
    // console.log(this.logininfo['access_token']);
    this._URL = this.getServiceAPI();
    let headers;
    if(sessionStorage.getItem('login_details')){
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
      headers = {
        headers : new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', this.logininfo['token'])
     }
    }else{
  
   headers = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    }
    // console.log(data);
  
    let URL = this._URL + Service;
    return this.http.get(URL,headers).toPromise().then(res => res);
  }

  logout(user){
    // this.competition_details_data = '';
    sessionStorage.removeItem('login_details');
    sessionStorage.removeItem('cartdata');
    // this.dps.getdata([]);
    // this.dps.competition_details();
   
    localStorage.clear();
    if(user == 'admin'){
      this.router.navigateByUrl('/admin', { skipLocationChange: false }).then(() => {
        this.router.navigate(['/admin']);
    });
  }else{
    this.router.navigateByUrl('/login', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/login']);
  });
}
  // this.signOut();
  }



  // signOut(): void {
  //   this.authService.signOut();
  // }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('client side error :', errorResponse.error.message);
    } else {
      // console.error(errorResponse.error);
        return errorResponse.error;
    }
    return throwError('ther is problem with service');
  }

  scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(() => {
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval); 
   },15);
  }
}
