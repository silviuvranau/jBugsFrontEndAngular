import { TestBed } from '@angular/core/testing';

import { SendNotificationsService } from './send-notifications.service';

describe('SendNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendNotificationsService = TestBed.get(SendNotificationsService);
    expect(service).toBeTruthy();
  });
});
