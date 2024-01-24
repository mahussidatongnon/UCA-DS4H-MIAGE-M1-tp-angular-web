import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getJWTToken();
    if (!token) {
      return next.handle(req);
    }
    req = req.clone({
      url:  req.url,
      setHeaders: {
        "x-access-token": `${token}`
      }
    });
    return next.handle(req);
  }
}