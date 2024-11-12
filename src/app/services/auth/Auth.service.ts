import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((response) => { 
          localStorage.setItem('access_token', response.token);   
      })
    );
  }

  logout(): void {
      localStorage.removeItem('access_token');  
  }

  public get loggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token') !== null;
    }
    return false;
  }
}
