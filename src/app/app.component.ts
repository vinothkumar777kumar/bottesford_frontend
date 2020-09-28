import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bottesford';
  constructor(private ngxService: NgxUiLoaderService){

  }

  ngOnInit() {
    
  }
}