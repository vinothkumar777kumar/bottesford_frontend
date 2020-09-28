import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

}
