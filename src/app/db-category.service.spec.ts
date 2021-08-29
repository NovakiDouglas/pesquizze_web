import { TestBed } from '@angular/core/testing';

import { DbCategoryService } from './db-category.service';

describe('DbCategoryService', () => {
  let service: DbCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
