import { TestBed } from '@angular/core/testing';

import { DbPaymentService } from './db-payment.service';

describe('DbPaymentService', () => {
  let service: DbPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
