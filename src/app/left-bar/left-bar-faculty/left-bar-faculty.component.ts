import { Component, OnInit } from '@angular/core';

import { UserService, User } from '../../user/user.service';
@Component({
    selector: 'left-bar-faculty',
    templateUrl: './left-bar-faculty.component.html',
    styleUrls: ['./left-bar-faculty.component.css']
})
export class LeftBarFacultyComponent implements OnInit {

    constructor( private userService: UserService ) { }
    
    user: User;

    ngOnInit(): void {
        this.user = this.userService.getUserInfo();
    }
}
