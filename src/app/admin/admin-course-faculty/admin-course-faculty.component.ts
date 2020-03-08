import { Component, OnInit } from '@angular/core';
import { getAdminCourses } from '../../common/colDefs';

@Component({
    selector: 'app-admin-course-faculty',
    templateUrl: './admin-course-faculty.component.html',
    styleUrls: ['./admin-course-faculty.component.css']
})
export class AdminCourseFacultyComponent implements OnInit {

    constructor() { }

    colDefs: any;
    rowData: any;

    ngOnInit(): void {
        this.colDefs = getAdminCourses();

    }

}
