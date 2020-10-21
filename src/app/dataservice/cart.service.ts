import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  tickets;
  ordersChanged = new Subject<any>()
  constructor(private apiser: DataserviceService) { }

  ticketbooking(data:any) {
   
    return this.apiser.apipostRecords('ticketbooking',data).then(res => res);
    
  }

  getticket(data){
    this.ordersChanged.next(data);
  }
}
