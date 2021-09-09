import { TestBed } from '@angular/core/testing';

import { DbAnswersService } from './db-answers.service';

describe('DbAnswersService', () => {
  let service: DbAnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
