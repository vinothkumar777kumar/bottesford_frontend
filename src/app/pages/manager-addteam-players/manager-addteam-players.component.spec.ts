import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddteamPlayersComponent } from './manager-addteam-players.component';

describe('ManagerAddteamPlayersComponent', () => {
  let component: ManagerAddteamPlayersComponent;
  let fixture: ComponentFixture<ManagerAddteamPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAddteamPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddteamPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
