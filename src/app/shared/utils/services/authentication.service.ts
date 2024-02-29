import { LocalStorageService, UserStatus } from '@vietlist/shared'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>
  public isAuthenticated$: Observable<boolean>
  private isSubscriptionSubject: BehaviorSubject<boolean>
  public isSubscription$: Observable<boolean>
  public userRole = new BehaviorSubject<string>('')
  public userDetailResponse = new BehaviorSubject<string>('')
  public userDetails = new BehaviorSubject<any>('')
  private accessToken: string = ''
  private subscriptionStatus: string = ''
  private loginInfo: any
  private registerUserInfo: any

  /**
   *
   * @param localstorageservice
   */

  constructor(private localstorageservice: LocalStorageService) {
    if (typeof localStorage !== 'undefined') {
      const loginInfoString = localStorage.getItem('loginInfo');
      if (loginInfoString) {
        const loginInfo = JSON.parse(loginInfoString);
       this.userRole.next(loginInfo.user_role)
      }
    }
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      this.checkAuthentication(),
    )
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

    this.isSubscriptionSubject = new BehaviorSubject<any>(
      this.checkSubscriptionStatus(),
    )
    this.isSubscription$ = this.isSubscriptionSubject.asObservable()

    // const token = localstorageservice.getData('accessToken')
    // if (token) {
    //   this.isSubscriptionSubject.next(true)
    // }
  }

  public setSubscriptonStatus(status: string) {
    this.subscriptionStatus = status
    if (status == UserStatus.Active) {
      this.isSubscriptionSubject.next(true)
    } else {
      this.isSubscriptionSubject.next(false)
    }
    this.localstorageservice.saveData(
      'subscriptionStatus',
      this.subscriptionStatus,
    )
  }

  public checkSubscriptionStatus() {
    const checkSubscriptionStatus =
      this.localstorageservice.getData('subscriptionStatus')
    if (checkSubscriptionStatus == UserStatus.Active) {
      return true
    } else {
      return false
    }
  }

  public isSubscriptionStatus(): boolean {
    return this.isSubscriptionSubject.value
  }

  public setAuthenticationStatusTrue(token: string): void {
    this.accessToken = token
    this.isAuthenticatedSubject.next(true)
    this.localstorageservice.saveData('accessToken', this.accessToken)
  }

  public getUserdata(): any {
    const storedLoginInfo = this.localstorageservice.getData('loginInfo')
    if (storedLoginInfo) {
      this.loginInfo = JSON.parse(storedLoginInfo)
      return this.loginInfo
    }
    return null
  }

  public getRegisterUserData(): any {
    const registeredUserData =
      this.localstorageservice.getData('vietlist::user')
    if (registeredUserData) {
      this.registerUserInfo = JSON.parse(registeredUserData)
      return this.registerUserInfo
    }
    return null
  }

  // Clear authentication status and token on logout
  public clearAuthentication(): void {
    this.accessToken = ''
    this.isAuthenticatedSubject.next(false)
    this.localstorageservice.removeData('accessToken')
    this.localstorageservice.removeData('loginInfo')
    this.localstorageservice.removeData('vietlist::user')
    this.localstorageservice.removeData('subscriptionStatus')
    this.localstorageservice.removeData('postId')
    this.localstorageservice.clearData()
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
  public checkAuthentication(): boolean {
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
    }
  }
}
