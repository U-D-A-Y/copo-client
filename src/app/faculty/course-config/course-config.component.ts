import { Component, OnInit, ViewChild } from '@angular/core';

import { FacultyCourseConfigService } from './course-config.service'

import {  getStudentManagement, getAssessmentCoMapping } from '@common/colDefs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'faculty-course-config',
    templateUrl: './course-config.component.html',
    styleUrls: ['./course-config.component.css'],
    providers: [FacultyCourseConfigService]
})
export class FacultyCourseConfigComponent implements OnInit {
    constructor(private service: FacultyCourseConfigService) { }

    @ViewChild('studentAgGrid') studentAgGrid: AgGridAngular;
    @ViewChild('assessmentAgGrid') assessmentAgGrid: AgGridAngular;

    ngOnInit(): void {
        this.studentColDefs = getStudentManagement();
        this.assessmentColDefs = getAssessmentCoMapping();
    }

    studentColDefs: any;
    studentRowData: any;

    assessmentColDefs: any;
    assessmentRowData: any;

    ngAfterViewInit(): void {
        this.studentAgGrid.api.sizeColumnsToFit();
        this.assessmentAgGrid.api.sizeColumnsToFit();
    }

    sectionChanged(values) {
        let sectionId = values["id"];

        this.studentRowData = this.service.getStudents(sectionId);
        this.assessmentRowData = this.service.getAssessments(sectionId);
    }
}
