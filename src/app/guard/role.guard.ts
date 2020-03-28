import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
    constructor(
        private userService: UserService,
        private router: Router
    ) {
        console.log('Role Guard constructor');
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        console.log("ROLE", next);
        let url = state.url;
        let role = url.split("/")[1];
        let userExists = this.checkIfRoleValid(role);
        return userExists;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url = state.url;
        let role = url.split("/")[1];
        console.log("ROLE-Child", role);
        let userExists = this.checkIfRoleValid(role);
        return userExists;
    }

    checkIfRoleValid(role) {
        let user = this.userService.getUserInfo();
        if (user && user["role"] == role) {
            // console.log("auth guard true");
            return true;
        } else {
            // console.log("auth guard false");
            // let redirectUrl = url;  
            this.router.navigate(['/']);
            return false;
        }
    }
}