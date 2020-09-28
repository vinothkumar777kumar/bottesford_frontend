import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    mainjsEvent: any;
  }
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  SlideOptions = { items: 3, dots: true, nav: false };  
  CarouselOptions = { items: 2, dots: true, nav: false }; 
  OurteamSlideOptions = { items: 5, dots: true, nav: false }; 
  OurteamCarouselOptions = { items: 9, dots: true, nav: false }; 
  TestimonialSlideOptions = { items: 3, dots: true, nav: false }; 
  constructor() { }

  ngOnInit(): void {
    window.mainjsEvent.contentWayPoint();
  }

}
