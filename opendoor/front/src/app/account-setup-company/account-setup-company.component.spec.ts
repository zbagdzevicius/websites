import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetupCompanyComponent } from './account-setup-company.component';

describe('AccountSetupCompanyComponent', () => {
  let component: AccountSetupCompanyComponent;
  let fixture: ComponentFixture<AccountSetupCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSetupCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSetupCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
