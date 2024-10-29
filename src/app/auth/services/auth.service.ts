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
   * @param identifier The email or nickname of the user.
   * @param password The user's password.
   * @returns An observable with the login result.
   */
  authenticator(identifier: string, password: string): Observable<{ status: string }> {
    const params = new HttpParams()
        .set('identifier', identifier)
        .set('password', password);

    return this.http.post<{ status: string }>(this.authUrl, null, { params });
}


 

  /**
   * Checks if the user is authenticated.
   * @returns A boolean indicating if the user is authenticated.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(){
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

}
