import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

}
