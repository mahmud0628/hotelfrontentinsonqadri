import { TestBed } from '@angular/core/testing';

import { BuyurtmaService } from './buyurtma.service';

describe('BuyurtmaService', () => {
  let service: BuyurtmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyurtmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
