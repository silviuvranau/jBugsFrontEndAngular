import {TestBed} from '@angular/core/testing';

import {ExcelBugsService} from './excel-bugs.service';

describe('ExcelBugsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelBugsService = TestBed.get(ExcelBugsService);
    expect(service).toBeTruthy();
  });
});
