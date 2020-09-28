import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportshallBookingListComponent } from './sportshall-booking-list.component';

describe('SportshallBookingListComponent', () => {
  let component: SportshallBookingListComponent;
  let fixture: ComponentFixture<SportshallBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportshallBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportshallBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
