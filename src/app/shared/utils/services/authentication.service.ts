import { LocalStorageService } from '@vietlist/shared'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>
  public isAuthenticated$: Observable<boolean>
  private accessToken: string = '';
  private loginInfo: any;
  private registerUserInfo: any;
  constructor(private localstorageservice: LocalStorageService) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthentication());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  }

  // Set authentication status to true when a token is received
  public setAuthenticationStatusTrue(token: string): void {
    this.accessToken = token;
    this.isAuthenticatedSubject.next(true);
    this.localstorageservice.saveData('accessToken', this.accessToken);
  }

  public getUserdata(): any {
    const storedLoginInfo = this.localstorageservice.getData('loginInfo');
    if (storedLoginInfo) {
      this.loginInfo = JSON.parse(storedLoginInfo);
      return this.loginInfo;
    }
    return null;
  }

  public getRegisterUserData(): any {
    const registeredUserData = this.localstorageservice.getData('vietlist::user')
    if (registeredUserData) {
      this.registerUserInfo = JSON.parse(registeredUserData);
      return this.registerUserInfo;
    }
    return null;
  }

  // Clear authentication status and token on logout
  public clearAuthentication(): void {
    this.accessToken = ''
    this.isAuthenticatedSubject.next(false)
    this.localstorageservice.removeData('accessToken')
    this.localstorageservice.removeData('loginInfo')
  }

  // Get the authentication token
  public getAuthToken(): string {
    return this.accessToken
  }

  // Check if the user is authenticated based on the token
  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  // Helper method to check authentication status on page load
  private checkAuthentication(): boolean {
    const storedToken = this.localstorageservice.getData('accessToken')
    if (storedToken) {
      this.accessToken = storedToken
      return true
    }
    return false
  }

  // Get headers for authenticated requests
 public getAuthHeaders(): any {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      // Add other headers as needed
    }
  }
}