import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminauthlayoutComponent } from './adminauthlayout.component';

describe('AdminauthlayoutComponent', () => {
  let component: AdminauthlayoutComponent;
  let fixture: ComponentFixture<AdminauthlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminauthlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminauthlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
