import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiser: DataserviceService) { }

  ticketbooking(data:any) {
   
    return this.apiser.apipostRecords('ticketbooking',data).then(res => res);
    
  }
}
