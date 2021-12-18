import { TestBed } from '@angular/core/testing';

import { RozorpayService } from './rozorpay.service';

describe('RozorpayService', () => {
  let service: RozorpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RozorpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
