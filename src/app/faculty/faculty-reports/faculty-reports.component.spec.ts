import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyReportsComponent } from './faculty-reports.component';

describe('FacultyReportsComponent', () => {
  let component: FacultyReportsComponent;
  let fixture: ComponentFixture<FacultyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
