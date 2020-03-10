import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCourseConfigComponent } from './course-config.component';

describe('CourseConfigComponent', () => {
  let component: FacultyCourseConfigComponent;
  let fixture: ComponentFixture<FacultyCourseConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyCourseConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyCourseConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
