import { register } from 'swiper/element/bundle'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Endpoints, GenericHelper } from '@vietlist/shared'
const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // public login(body:any):Observable<any>{
  //   return this.http.post<any>(`${baseUrl}${API_URL.signin_url}` , body)
  // }

  public register(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Signup)
    return this.http.post<any>(endpoint, body)
  }

  public login(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Login)
    return this.http.post<any>(endpoint, body)
  }

  public forgotPassword(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Forgotpassword)
    return this.http.post<any>(endpoint, body)
  }

  public sendOtp(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SendOtp)
    return this.http.post<any>(endpoint, body)
  }

  public resetPassword(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ResetPassword)
    return this.http.post<any>(endpoint, body)
  }
}
