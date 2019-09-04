import { TestBed } from '@angular/core/testing';

import { UserregService } from './userreg.service';

describe('UserregService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserregService = TestBed.get(UserregService);
    expect(service).toBeTruthy();
  });
});
