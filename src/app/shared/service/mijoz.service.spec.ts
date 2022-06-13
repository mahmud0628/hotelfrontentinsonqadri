import { TestBed } from '@angular/core/testing';

import { MijozService } from './mijoz.service';

describe('MijozService', () => {
  let service: MijozService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MijozService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
