import { TestBed } from '@angular/core/testing';

import { AlertConfirmService } from './alert-confirm.service';

describe('AlertService', () => {
  let service: AlertConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
