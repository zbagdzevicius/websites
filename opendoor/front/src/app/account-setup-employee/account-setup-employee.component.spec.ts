import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetupEmployeeComponent } from './account-setup-employee.component';

describe('AccountSetupEmployeeComponent', () => {
  let component: AccountSetupEmployeeComponent;
  let fixture: ComponentFixture<AccountSetupEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSetupEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSetupEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
