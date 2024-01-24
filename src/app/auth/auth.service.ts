import { Injectable } from '@angular/core';
import { API_URL } from '../shared/utils/constants/api-url.const';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(body: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}${API_URL.login_url}`, body)
  }

  public forgotPassword(body: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}${API_URL.forgot_password_url}`, body)
  }
}
