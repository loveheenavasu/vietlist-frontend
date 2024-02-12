import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthenticationService, LocalStorageService } from '../services'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public isAuthenticated: boolean = false
  public userRole: string = ''
  public subscriptionStatus: boolean = false
  constructor(
    private router: Router,
    private sessionService: AuthenticationService,
    private localStorage: LocalStorageService,
  ) {
    this.sessionService.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res
    })
    this.sessionService.userRole.subscribe((res) => {
      this.userRole = res
      if (!this.userRole) {
        const data = JSON.parse(this.localStorage.getData('loginInfo'))
        if (data) {
          this.userRole = data.user_role
        }
      }
    })
    // const checkStatus = this.localStorage.getData('subscriptionStatus')
    // if (checkStatus == 'active') {
    //   this.subscriptionStatus = true
    // }
    this.sessionService.isSubscription$.subscribe((res) => {
      this.subscriptionStatus = res
      console.log('check the subscription status', res)
    })
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated && this.userRole == 'subscriber') {
      return true
    } else if (
      this.isAuthenticated &&
      this.userRole == 'business-owner' &&
      this.subscriptionStatus
    ) {
      return true
    }

    this.router.navigateByUrl('/not-found')
    return false
  }
}
