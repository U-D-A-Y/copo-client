import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoUsersComponent } from './demo-users.component';

describe('DemoUsersComponent', () => {
  let component: DemoUsersComponent;
  let fixture: ComponentFixture<DemoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
