import { Component } from "@angular/core";
import { LoginService } from './login.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ LoginService ]
})
export class LoginComponent {
    constructor(private service: LoginService) {}

    login(username, password, role) {
        // console.log(username, password, role);
        this.service.login(username, password, role)
        .subscribe(result => {
            console.log("Login Succeded");
        })
    }
}