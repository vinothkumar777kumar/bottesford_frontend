import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScheduleDetailsComponent } from './match-schedule-details.component';

describe('MatchScheduleDetailsComponent', () => {
  let component: MatchScheduleDetailsComponent;
  let fixture: ComponentFixture<MatchScheduleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScheduleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
