import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: FacultyProfileComponent;
  let fixture: ComponentFixture<FacultyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
