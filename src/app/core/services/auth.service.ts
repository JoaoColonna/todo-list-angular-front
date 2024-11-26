import { Injectable } from '@angular/core';
import { BaseApiClientService } from './base-api-client.service';
import { UserRequest, UserResponse, LoginRequest, LoginResponse } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpointLogin = 'login';
  private endpointUser = 'user';

  constructor(
    private jwtHelper: JwtHelperService,
    private baseApiClientAuth: BaseApiClientService<LoginRequest, LoginResponse>,
    private baseApiClientUser: BaseApiClientService<UserRequest, UserResponse>
  ) { }

  createUser(userRequest: UserRequest): Observable<UserResponse> {
    return this.baseApiClientUser.post(this.endpointUser, userRequest);
  }

  updateUser(id: number, userRequest: UserRequest): Observable<UserResponse> {
    return this.baseApiClientUser.update(this.endpointUser, id, userRequest);
  }

  login(loginRequest: LoginRequest) {
    return this.baseApiClientAuth.post(this.endpointLogin, loginRequest).subscribe({
      next: (data: LoginResponse) => {
        if (!this.isTokenValid(data.token)) {
          console.error('Token inválido!');
          return;
        }

        this.saveToken(data.token);
        this.setSession(data);
      }
    });
  }

  private setSession(loginResponse: LoginResponse) {
    localStorage.setItem('usr_email', loginResponse.usr_email);
    localStorage.setItem('usr_id', loginResponse.usr_id.toString());
    localStorage.setItem('usr_name', loginResponse.usr_name);
  }

  saveToken(token: string): void {
    localStorage.setItem('id_token', token);
  }

  isTokenValid(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  getCurrentUser() {
    return {
      usr_email: localStorage.getItem('usr_email'),
      usr_id: localStorage.getItem('usr_id'),
      usr_name: localStorage.getItem('usr_name')
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('usr_email');
    localStorage.removeItem('usr_id');
    localStorage.removeItem('usr_name');
  }
}
