import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LeftBarService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    proxyPrefix = "/api";

    logOut() {
        let apiUrl = this.proxyPrefix + "/auth/logout";

        return this.http.post(apiUrl, {})
        .pipe(
            map(result => {
                console.log("logout", result);
                this.router.navigate(['/']);
            }),
            catchError(error => {
                console.log("logout error", error);
                return throwError(error);
            })
        )
    }
}