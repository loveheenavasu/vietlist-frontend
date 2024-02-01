import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    public isAuthenticated: boolean = false;
    constructor(private router: Router, private sessionService: AuthenticationService) {

        this.sessionService.isAuthenticated$.subscribe(res => {
            this.isAuthenticated = res
        })
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.isAuthenticated) {
            this.router.navigateByUrl('/not-found');
            return false;
        } else {
            return true;
        }
    }
}