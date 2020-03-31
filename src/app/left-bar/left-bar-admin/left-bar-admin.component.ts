import { Component, OnInit } from '@angular/core';

import { UserService, User } from '../../user/user.service';
@Component({
    selector: 'left-bar-admin',
    templateUrl: './left-bar-admin.component.html',
    styleUrls: ['./left-bar-admin.component.css']
})
export class LeftBarAdminComponent implements OnInit {

    constructor( private userService: UserService ) { }

    user: User;

    ngOnInit(): void {
        this.user = this.userService.getUserInfo();
    }
}
