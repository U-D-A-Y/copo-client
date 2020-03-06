import { Component, OnInit } from '@angular/core';

import { AdminDashboardService } from './admin-dashboard.service';

import * as alertify from 'alertifyjs';
@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    providers: [AdminDashboardService],
})
export class AdminDashboardComponent implements OnInit {
    constructor(private service: AdminDashboardService) { }

    semester: any;
    year: any;

    facultyCount: Number;
    courseCount: Number;
    studentCount: Number;

    ngOnInit(): void {
        this.service.getCurrentSemesterAndYear()
        .subscribe(curSem => {
            this.semester = curSem.semester;
            this.year = curSem.year;
        })

        this.service.getDashboardTotals()
        .subscribe(totals => {
            this.facultyCount = totals["faculty"];
            this.courseCount = totals["course"];
            this.studentCount = totals["student"];
        })
    }

    // handleSemesterUpdate
    handleSemesterUpdate(semester, year) {
        console.log(semester, year);
        this.service.updateCurrentSemester(semester, year)
        .subscribe(
            result => {
                alertify.success('Successfully Updated')
            },
            error => {
                alertify.error("Failed to update semester");
            }
        )
    }

    handleCreateUser(initial, password) {
        this.service.createUser(initial, password)
        .subscribe(
            result => {
                console.log(result);
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('successfully new user added');
            },
            error => {
                console.error(error);
                alertify.error("Error creating user");
            }
        )
    }
}
