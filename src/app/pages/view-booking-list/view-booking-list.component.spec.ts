import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingListComponent } from './view-booking-list.component';

describe('ViewBookingListComponent', () => {
  let component: ViewBookingListComponent;
  let fixture: ComponentFixture<ViewBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
