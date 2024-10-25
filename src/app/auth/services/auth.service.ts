import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  private authUrl = 'http://localhost:8080/user/login/';

  constructor(private http: HttpClient) {}

  authentificate1(correo: string, password:string): Observable<User> {
    return this.http.post<User>(this.authUrl, { correo, password });
  }

  authenticate(identifier: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('identifier', identifier)
      .set('password', password);
    return this.http.post<any>(this.authUrl, { params });
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

}