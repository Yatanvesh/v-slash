import { Injectable } from '@angular/core'
import { JWT_KEY } from '../core.constants'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { LoginResponse } from '../core.types'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = ''

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem(JWT_KEY)
    this.token = token || ''
    return !!token
  }

  saveToken(token: string) {
    localStorage.setItem(JWT_KEY, token)
  }

  clearToken() {
    localStorage.removeItem(JWT_KEY)
  }

  login(payload: { email: string; password: string }) {
    return this.http.post<LoginResponse>(
      `${environment.baseUrl}/api/auth/login`,
      payload,
    )
  }

  logout() {
    this.token = ''
    this.clearToken()
  }

  register(register: { password: string; name: string; email: string }) {
    return this.http.post<any>(
      `${environment.baseUrl}/api/auth/register`,
      register,
    )
  }

  getGraphQlContext() {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    }
  }
}
