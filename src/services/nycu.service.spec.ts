import { TestBed } from '@angular/core/testing';

import { NycuService } from './nycu.service';

describe('NycuService', () => {
  let service: NycuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NycuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
