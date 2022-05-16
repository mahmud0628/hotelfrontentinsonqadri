import { TestBed } from '@angular/core/testing';

import { HodimService } from './hodim.service';

describe('HodimService', () => {
  let service: HodimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HodimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
