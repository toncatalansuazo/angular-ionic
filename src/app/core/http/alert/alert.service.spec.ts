import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });

  it('should be call endpoint', () => {
    const service: AlertService = TestBed.get(AlertService);
    service.getAlerts();
    expect(service).toBeTruthy();
  });
});
