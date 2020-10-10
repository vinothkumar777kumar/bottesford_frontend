import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTeamPlayersComponent } from './manager-team-players.component';

describe('ManagerTeamPlayersComponent', () => {
  let component: ManagerTeamPlayersComponent;
  let fixture: ComponentFixture<ManagerTeamPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTeamPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTeamPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
