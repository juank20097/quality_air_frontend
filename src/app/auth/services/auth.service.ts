import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuthenticated = false;
  private authUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) {}

  /**
   * Authenticates the user with the given credentials.
   * @param identifier The username or nickname of the user.
   * @param password The user's password.
   * @returns An observable with the login result from the server.
   */
  authenticator(identifier: string, password: string): Observable<{ result: string, rol: string }> {
    const params = new HttpParams()
      .set('identifier', identifier)
      .set('password', password);

    return this.http.post<{ result: string, rol: string }>(this.authUrl, null, { params });
  }

  /**
   * Marks the user as logged in (used to toggle UI states).
   */
  login() {
    this.isAuthenticated = true;
  }

  /**
   * Marks the user as logged out (used to toggle UI states).
   */
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  /**
   * Returns true if the user is authenticated.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Retrieves the logged-in user's identifier from localStorage.
   */
  getUser(): string | null {
    return localStorage.getItem('user');
  }

  /**
   * Retrieves the role of the logged-in user from localStorage.
   */
  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
