import { TestBed } from '@angular/core/testing';

import { UserFileListService } from './user-file-list.service';

describe('UserFileListService', () => {
  let service: UserFileListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFileListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
