import { TestBed } from '@angular/core/testing';

import { PastexamService } from './pastexam.service';

describe('PastexamService', () => {
  let service: PastexamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastexamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
