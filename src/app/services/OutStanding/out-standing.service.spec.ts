import { TestBed } from '@angular/core/testing';

import { OutStandingService } from './out-standing.service';

describe('OutStandingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutStandingService = TestBed.get(OutStandingService);
    expect(service).toBeTruthy();
  });
});
