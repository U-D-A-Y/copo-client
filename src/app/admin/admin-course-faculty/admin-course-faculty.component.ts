import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminCourseFacultyService } from './admin-course-faculty.service';
import { getAdminCourses, getAdminFaculty } from '../../common/colDefs';
import { AgGridAngular } from 'ag-grid-angular';

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

    @ViewChild('courseAgGrid') courseAgGrid: AgGridAngular;
    @ViewChild('facultyAgGrid') facultyAgGrid: AgGridAngular;

    ngOnInit(): void {
        this.courseColDefs = getAdminCourses();
        this.courseRowData = this.service.getAllCourses();
        
        this.facultyColDefs = getAdminFaculty();
        this.facultyRowData = this.service.getAllFaculty();
    }

    ngAfterViewInit() {
        this.courseAgGrid.api.sizeColumnsToFit();
        this.facultyAgGrid.api.sizeColumnsToFit();
    }

}
