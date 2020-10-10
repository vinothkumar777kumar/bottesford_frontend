import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSignUpComponent } from './manager-sign-up.component';

describe('ManagerSignUpComponent', () => {
  let component: ManagerSignUpComponent;
  let fixture: ComponentFixture<ManagerSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
