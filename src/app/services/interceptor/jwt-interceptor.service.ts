import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      console.log('Token from localStorage:', token);  // Log para verificar el token

      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        console.log('Cloned Request Headers:', cloned.headers);  // Log para verificar los encabezados de la solicitud clonada
        return next.handle(cloned);
      } else {
        console.log('No token found');  // Log en caso de que no haya token
        return next.handle(req);
      }
    } else {
      console.log('Running on the server, skipping token injection');  // Log en caso de que se esté ejecutando en el servidor
      return next.handle(req);
    }
  }
}
