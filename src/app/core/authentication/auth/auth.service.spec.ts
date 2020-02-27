import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TestCoreModule } from 'src/app/utils/test/test-core.module';
import { HttpClient } from '@angular/common/http';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [TestCoreModule]});
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login api', () => {
    const spyLogin = spyOn(http, 'post');
    service.login(undefined);
    expect(spyLogin).toHaveBeenCalledTimes(1);
    expect(spyLogin).toHaveBeenCalledWith(ConfigurationEndpoint.getLoginEndpoint(), undefined);
  });
});
