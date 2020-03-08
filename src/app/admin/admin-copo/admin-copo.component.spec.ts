import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCopoComponent } from './admin-copo.component';

describe('AdminCopoComponent', () => {
  let component: AdminCopoComponent;
  let fixture: ComponentFixture<AdminCopoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCopoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
