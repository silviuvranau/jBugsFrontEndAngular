import {TestBed} from '@angular/core/testing';

import {CaptchaServiceService} from './captcha-service.service';

describe('CaptchaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaptchaServiceService = TestBed.get(CaptchaServiceService);
    expect(service).toBeTruthy();
  });
});
