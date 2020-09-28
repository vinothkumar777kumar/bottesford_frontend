import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailComponent } from './hall-detail.component';

describe('HallDetailComponent', () => {
  let component: HallDetailComponent;
  let fixture: ComponentFixture<HallDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
