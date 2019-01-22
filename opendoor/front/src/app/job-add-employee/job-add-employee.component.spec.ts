import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddEmployeeComponent } from './job-add-employee.component';

describe('JobAddEmployeeComponent', () => {
  let component: JobAddEmployeeComponent;
  let fixture: ComponentFixture<JobAddEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAddEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
