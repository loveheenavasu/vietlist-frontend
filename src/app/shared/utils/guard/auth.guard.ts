import { AuthenticationService, LocalStorageService } from '@vietlist/shared';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Roles } from '../enums';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: AuthenticationService,
    private localStorageService:LocalStorageService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): Observable<boolean> | UrlTree {
    return this.sessionService.isAuthenticated$.pipe(
      tap((res) => console.log(res)),
      switchMap((isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          return this.sessionService.userRole.pipe(
            switchMap((userRole) => {
              console.log('userRole', userRole)
              if (userRole === Roles.subscriber) {
                // Swal.fire({
                //   toast: true,
                //   text: 'You are not authorized for this feature!',
                //   animation: false,
                //   icon: 'warning',
                //   position: 'top-right',
                //   showConfirmButton: false,
                //   timer: 3000,
                //   timerProgressBar: true,
                // });
                return of(true);

              } else {
                this.sessionService.isSubscription$.subscribe(res => console.log(res))
                return this.sessionService.isSubscription$;
              }
            }),
          );
        } else {
          this.router.navigateByUrl('/');
          return of(false);
        }
      }),
      catchError((err) => {
        console.log(err , "ERROR")
        return this.router.navigateByUrl('/');
      }),
    );
  }
}



@Injectable({
  providedIn: 'root',
})
export class AuthHomeGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: AuthenticationService,
    private localStorageService:LocalStorageService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): Observable<boolean> | UrlTree {
    return this.sessionService.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        console.log(isAuthenticated);
        if (!isAuthenticated) {
          return of(true)
        } else {
          return of(false)
        }
      }),
      catchError((err) => {
        console.log(err , "ERROR")
        return of(true);
      }),
    );
  }
}
