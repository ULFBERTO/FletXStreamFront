import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private apiUrl = 'http://localhost:3000/procedure/';

  private token = localStorage.getItem('access_token');

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getDesserts(): Observable<any> {
    return this.http.get(this.apiUrl + 'ObtenerPostres', { headers: this.headers });
  }

  getDrivers(): Observable<any> {
    console.log('Realizando solicitud GET a:', this.apiUrl);
    return this.http.get(this.apiUrl + 'GetDrivers', { headers: this.headers  });
  }

  getDriversWithCharges(): Observable<any> {
    console.log('Realizando solicitud GET a:', this.apiUrl);
    return this.http.get(this.apiUrl + 'getDriversWithCharges', { headers: this.headers  });
  }

  getDateChargesByIds(value: string): Observable<any> {
    const url = `${this.apiUrl}getDatechargerByIdsChargers/${value}`;

    //http://localhost:3000/procedure/getDatechargerByIdsChargers/1,6,11,16
    return this.http.get(url, { headers: this.headers });
  }
  
  
}