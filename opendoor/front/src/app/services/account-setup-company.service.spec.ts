import { TestBed, inject } from '@angular/core/testing';

import { AccountSetupCompanyService } from './account-setup-company.service';

describe('AccountSetupCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSetupCompanyService]
    });
  });

  it('should be created', inject([AccountSetupCompanyService], (service: AccountSetupCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
