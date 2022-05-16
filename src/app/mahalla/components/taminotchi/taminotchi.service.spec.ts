import { TestBed } from '@angular/core/testing';

import { TaminotchiService } from './taminotchi.service';

describe('TaminotchiService', () => {
  let service: TaminotchiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaminotchiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
