import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { AdminCourseService } from './admin-course.service';

import { getAdminCourses } from '@common/colDefs';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
    selector: 'app-admin-course',
    templateUrl: './admin-course.component.html',
    styleUrls: ['./admin-course.component.css'],
    providers: [AdminCourseService]
})

export class AdminCourseComponent implements OnInit, AfterViewInit {
    constructor(private service: AdminCourseService) { }

    colDefs: any;
    rowData: any;

    @ViewChild('courseAgGrid') courseAgGrid: AgGridAngular;

    ngOnInit(): void {
        this.colDefs = getAdminCourses();
        this.rowData = this.service.getOfferedCourses();
    }

    ngAfterViewInit() {
        this.courseAgGrid.api.sizeColumnsToFit();
    }
}
