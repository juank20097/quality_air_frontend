import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/user/login'; // URL para la autenticación

  constructor(private http: HttpClient) {}

  authenticate(identifier: string, password: string): Observable<any> {
    // Crear parámetros para la solicitud
    const params = new HttpParams()
      .set('identifier', identifier)
      .set('password', password);

    // Enviar la solicitud POST al backend
    return this.http.post<any>(this.authUrl, null, { params });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') === 'authenticated';
  }

  getUserIdentifier(): string | null {
    return localStorage.getItem('identifier');
  }

}