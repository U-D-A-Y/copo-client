import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    proxyPrefix = "/api";
    
    login(username, password, role) {
        let apiUrl = this.proxyPrefix + "/auth/login";
        return this.http.post(apiUrl,
            {
                username: username,
                password: password,
                role: role
            }
        )
        .pipe(
            map(result => {
                console.log("login service called", result);

                if (result["success"] === true) {
                    // window.location.href = `${access}/${access}_dashboard`;
                    this.router.navigate([`/${role}`]);
                } else {
                    alert('Username/Password Incorecct!');
                }
            })
        )       
    }
    
}