import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

import { UserService } from '../user/user.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private userService: UserService,
        private router: Router
    ) {
        // console.log('Auth Guard constructor');
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url = state.url;
        let userExists = this.checkIfUserExists(url);
        return userExists;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url = state.url;
        let userExists = this.checkIfUserExists(url);
        return userExists;
    }

    checkIfUserExists(url) {
        let user = this.userService.getUserInfo();
        if (user) {
            // console.log("auth guard true");
            return true;
        } else {
            // console.log("auth guard false");
            let redirectUrl = url;  
            this.router.navigate(['/']);
            return false;
        }
    }
}