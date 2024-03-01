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
  userRole:any
  constructor(
    private router: Router,
    private sessionService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) {
 

  }
  
  

  // Retrieve user roles from localStorage
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,

  // ): Observable<boolean> | UrlTree {
  //   const roles = next.data['roles'] as Array<string>; 
  //   return this.sessionService.isAuthenticated$.pipe(
  //     tap((res) => console.log(res)),
  //     switchMap((isAuthenticated) => {
  //       console.log(isAuthenticated);
  //       if (isAuthenticated) {
  //         return this.sessionService.userRole.pipe(
  //           switchMap((userRole) => {
  //             console.log('userRole', userRole, roles)
  //              if(roles[0] =='business-owner'){

  //              }else{
  //             if (userRole === Roles.subscriber ) {
  //               return of(true);
  //             }else {
  //               this.sessionService.isSubscription$.subscribe(res => console.log(res))
  //               return this.sessionService.isSubscription$;
  //             }
  //           }
  //           }),
  //         );
  //       } else {
  //         this.router.navigateByUrl('/login');
  //         return of(false);
  //       }
  //     }),
  //     catchError((err) => {
  //       console.log(err , "ERROR")
  //       return this.router.navigateByUrl('/');
  //     }),
  //   );
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | UrlTree {
    const requiredRoles = next.data['roles'] as Array<string>;

    return this.sessionService.isAuthenticated$.pipe(
      tap((res) => console.log(res)),
      switchMap((isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          return this.sessionService.userRole.pipe(
            switchMap((userRole) => {
              console.log(requiredRoles,'requiredRolesrequiredRoles',userRole )
              if (requiredRoles.includes(userRole)) {
                 console.log(requiredRoles,'requiredRolesrequiredRoles',userRole )
                return of(true);

              } else {
                console.log("Check Else Og AUth Guard")
                // Handle unauthorized access (e.g., show a warning message)
                Swal.fire({
                  toast: true,
                  text: 'You are not authorized for this feature!',
                  animation: false,
                  icon: 'warning',
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,

                });
                this.router.navigateByUrl('/');
                return of(false);
              }
                // if (userRole === Roles.subscriber) {
                //   return of(true);
                // } else {
                //   this.sessionService.isSubscription$.subscribe(res => console.log(res));
                //   return this.sessionService.isSubscription$;
                // }
            
            }),
          );
        } else {
          this.router.navigateByUrl('/');
          return of(false);
        }
      }),
      catchError((err) => {
        console.log(err, "ERROR");
        return this.router.navigateByUrl('/');
      }),
    );
  }


}



// @Injectable({
//   providedIn: 'root',
// })
// export class AuthHomeGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private sessionService: AuthenticationService,
//     private localStorageService:LocalStorageService
//   ) { }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,

//   ): Observable<boolean> | UrlTree {
//     return this.sessionService.isAuthenticated$.pipe(
//       switchMap((isAuthenticated) => {
//         console.log(isAuthenticated);
//         if (!isAuthenticated) {
//           return of(true)
//         } else {
//           return of(false)
//         }
//       }),
//       catchError((err) => {
//         console.log(err , "ERROR")
//         return of(true);
//       }),
//     );
//   }
// }
