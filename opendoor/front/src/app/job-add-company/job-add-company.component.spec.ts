import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddCompanyComponent } from './job-add-company.component';

describe('JobAddCompanyComponent', () => {
  let component: JobAddCompanyComponent;
  let fixture: ComponentFixture<JobAddCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAddCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
