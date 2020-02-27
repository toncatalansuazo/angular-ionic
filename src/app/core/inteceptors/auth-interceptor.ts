import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth/auth.service';


export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.auth.token) {
            this.auth.token = this.auth.getTokenFromStorage();
        }
        const cloneReq = req.clone({params:
            req.params.set('Authorization', this.auth.token)
        });
        return next.handle(cloneReq);
    }
}
