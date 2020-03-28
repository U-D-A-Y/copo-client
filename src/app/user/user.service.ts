import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() {}
    
    proxyPrefix = "/api";

    getUserInfoFromServer(username) {
        let apiUrl = this.proxyPrefix + "/"
    }

    setUserInfo(user: User) {
        let userString = JSON.stringify(user);
        localStorage.setItem('copo-user', userString);
    }

    getUserInfo(): User {
        let userString = localStorage.getItem('copo-user');
        let user: User;
        try {
            user = JSON.parse(userString);
        } catch(err) {
            return null;
        }
        return user;
    }

    updateUserInfo(propertiesToUpdate) {
        let userString = localStorage.getItem('copo-user');
        let user: User = JSON.parse(userString);
        for (let property in propertiesToUpdate) {
            let value = propertiesToUpdate[property];
            user[property] = value;
        }
        userString = JSON.stringify(user);
        localStorage.setItem('copo-user', userString);
    }

    removeUserInfo() {
        localStorage.setItem("copo-user", "");
    }
}

export interface User {
    username: String,
    role: String,
    name: String,
    designation: String,
    initial: String
}