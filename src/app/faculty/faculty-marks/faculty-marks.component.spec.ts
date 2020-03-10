import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyMarksComponent } from './faculty-marks.component';

describe('FacultyMarksComponent', () => {
  let component: FacultyMarksComponent;
  let fixture: ComponentFixture<FacultyMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
