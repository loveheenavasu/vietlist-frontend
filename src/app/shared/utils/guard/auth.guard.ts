import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Roles } from '../enums';
import { AuthenticationService, LocalStorageService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.sessionService.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.sessionService.userRole.pipe(
            switchMap((userRole) => {
              if (userRole === Roles.subscriber) {
                return of(true);
              } else {
                return this.sessionService.isSubscription$;
              }
            }),
          );
        } else {
          this.router.navigateByUrl('/login');
          return of(false);
        }
      }),
      catchError((err) => {
        console.log(err , "ERROR")
        this.router.navigateByUrl('/');
        return of(false);
      }),
    );
  }
}