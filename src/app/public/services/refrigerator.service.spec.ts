import { TestBed } from '@angular/core/testing';

import { RefrigeratorService } from './refrigerator.service';

describe('RefrigeratorService', () => {
  let service: RefrigeratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrigeratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
