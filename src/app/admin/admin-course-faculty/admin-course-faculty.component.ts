import { Component, OnInit } from '@angular/core';
import { AdminCourseFacultyService } from './admin-course-faculty.service';
import { getAdminCourses, getAdminFaculty } from '../../common/colDefs';

@Component({
    selector: 'app-admin-course-faculty',
    templateUrl: './admin-course-faculty.component.html',
    styleUrls: ['./admin-course-faculty.component.css'],
    providers: [AdminCourseFacultyService]
})
export class AdminCourseFacultyComponent implements OnInit {

    constructor(private service: AdminCourseFacultyService) { }

    courseColDefs: any;
    courseRowData: any;

    facultyColDefs: any;
    facultyRowData: any;

    ngOnInit(): void {
        this.courseColDefs = getAdminCourses();
        this.courseRowData = this.service.getAllCourses();
        
        this.facultyColDefs = getAdminFaculty();
        this.facultyRowData = this.service.getAllFaculty();
    }

}
