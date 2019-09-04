import { TestBed } from '@angular/core/testing';

import { VesselRegistrationService } from './vessel-registration.service';

describe('VesselRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VesselRegistrationService = TestBed.get(VesselRegistrationService);
    expect(service).toBeTruthy();
  });
});
