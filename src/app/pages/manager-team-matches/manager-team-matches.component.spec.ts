import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTeamMatchesComponent } from './manager-team-matches.component';

describe('ManagerTeamMatchesComponent', () => {
  let component: ManagerTeamMatchesComponent;
  let fixture: ComponentFixture<ManagerTeamMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTeamMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTeamMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
