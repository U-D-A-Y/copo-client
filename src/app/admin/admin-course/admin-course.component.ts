import { Component, OnInit } from '@angular/core';

import { AdminCourseService } from './admin-course.service';

import { getAdminCourses } from '@common/colDefs';
@Component({
    selector: 'app-admin-course',
    templateUrl: './admin-course.component.html',
    styleUrls: ['./admin-course.component.css'],
    providers: [AdminCourseService]
})

export class AdminCourseComponent implements OnInit {
    constructor(private service: AdminCourseService) { }

    colDefs: any;
    rowData: any;

    ngOnInit(): void {
        this.colDefs = getAdminCourses();
        this.rowData = this.service.getOfferedCourses();
    }

}
