import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, RegisterRequest, TokenResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiUrl + '/auth';


  constructor(private http:HttpClient) { }

  // register(data: RegisterRequest): Observable<any> {
  //   return this.http.post<any>(`${this.api}/register`, data);
  // }
  register(data: { name: string; email: string; password: string }) {
  return this.http.post(
    `${this.api}/register`,
    data
  );
}


  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.api}/login`, data).pipe(
      tap(res => {
        // store token for later use
        localStorage.setItem('token', res.access_token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
