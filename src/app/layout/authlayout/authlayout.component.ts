import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.css']
})
export class AuthlayoutComponent implements OnInit {

  constructor(private ds: DataserviceService) { }

  ngOnInit(): void {
    this.ds.scrollToTop(200);
  }

}
