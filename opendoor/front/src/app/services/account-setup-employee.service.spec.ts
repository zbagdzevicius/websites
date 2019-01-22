import { TestBed, inject } from '@angular/core/testing';

import { AccountSetupEmployeeService } from './account-setup-employee.service';

describe('AccountSetupEmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSetupEmployeeService]
    });
  });

  it('should be created', inject([AccountSetupEmployeeService], (service: AccountSetupEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
