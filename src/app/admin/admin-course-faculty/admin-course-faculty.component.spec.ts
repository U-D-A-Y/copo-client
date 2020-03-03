import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseFacultyComponent } from './admin-course-faculty.component';

describe('AdminCourseFacultyComponent', () => {
  let component: AdminCourseFacultyComponent;
  let fixture: ComponentFixture<AdminCourseFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
