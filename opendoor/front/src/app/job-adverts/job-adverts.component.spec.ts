import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdvertsComponent } from './job-adverts.component';

describe('JobAdvertsComponent', () => {
  let component: JobAdvertsComponent;
  let fixture: ComponentFixture<JobAdvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAdvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
