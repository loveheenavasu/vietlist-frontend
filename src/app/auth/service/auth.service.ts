import { AuthResponse } from './auth.interface'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { Endpoints, GenericHelper } from '@vietlist/shared'
const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
   const Token =  localStorage.getItem('accessToken')
   console.log(Token,'Token')
   if(Token){
     this.isLoggedIn = true;
   }
  }

  

  public register(body: any): Observable<AuthResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Signup)
    return this.http.post<AuthResponse>(endpoint, body)
  }
  public login(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Login);
    // Send the POST request to the login endpoint
    // this.isLoggedInSubject.next(true); 
    return this.http.post<any>(endpoint, body).pipe(
      tap(() => {
        // If login succeeds, set isLoggedIn to true
        this.isLoggedIn = true;
      })
    );
  }

  // Method to check if the user is logged in
  // public isAuthenticated(): boolean {
  //   return this.isLoggedIn;
  // }

  // public login(body: any): Observable<any> {
  //   const endpoint = GenericHelper.appendBaseUrl(Endpoints.Login)
  //   this.isLoggedIn = true;
  //   return this.http.post<any>(endpoint, body)
  // }

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

  //  public isAuthenticated() : boolean {
  //   const token = localStorage.getItem('authToken');
  //   const helper = new JwtHelperService();
  //   const isExpired = helper.isTokenExpired(token);
  //   return !isExpired;
  // }
}
