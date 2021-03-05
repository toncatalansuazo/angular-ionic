import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { HttpClient } from '@angular/common/http';

describe('PaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const service: PaymentService = TestBed.get(new PaymentService(httpClientSpy));
    expect(service).toBeTruthy();
  });
});
