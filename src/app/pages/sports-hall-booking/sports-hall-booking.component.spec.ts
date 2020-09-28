import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsHallBookingComponent } from './sports-hall-booking.component';

describe('SportsHallBookingComponent', () => {
  let component: SportsHallBookingComponent;
  let fixture: ComponentFixture<SportsHallBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsHallBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsHallBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
