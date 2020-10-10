import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreinfoLatestgameResultComponent } from './moreinfo-latestgame-result.component';

describe('MoreinfoLatestgameResultComponent', () => {
  let component: MoreinfoLatestgameResultComponent;
  let fixture: ComponentFixture<MoreinfoLatestgameResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreinfoLatestgameResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreinfoLatestgameResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
