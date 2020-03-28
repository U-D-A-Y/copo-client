import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User, UserService} from '../user/user.service';
@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private userService: UserService
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
                    this.setUserInfo(result["data"]);
                    this.router.navigate([`/${role}`]);
                } else {
                    let error = result["error"];
                    if (error["message"]) {
                        alert(error["message"]);
                    } else {
                        alert('Username/Password Incorecct!');
                    }
                }
            })
        )       
    }
    

    setUserInfo(data) {
        let user: User = {
            name : data["name"],
            username : data["username"],
            initial : data["initial"],
            role : data["role"],
            designation : data["designation"],
        }

        this.userService.setUserInfo(user);
    }
}