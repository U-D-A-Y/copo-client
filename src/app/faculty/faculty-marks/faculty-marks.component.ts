import { Component, OnInit, ViewChild } from '@angular/core';

import { FacultyMarksService } from './faculty-marks.service';

import { getAssessmentCoMapping, getStudentMarks } from '@common/colDefs';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
    selector: 'faculty-marks',
    templateUrl: './faculty-marks.component.html',
    styleUrls: ['./faculty-marks.component.css'],
    providers: [ FacultyMarksService ],
})
export class FacultyMarksComponent implements OnInit {
    constructor(private service: FacultyMarksService) { }

    @ViewChild('assessmentAgGrid') assessmentAgGrid: AgGridAngular;
    @ViewChild('markAgGrid') markAgGrid: AgGridAngular;

    assessmentColDefs: any;
    assessmentRowData: any;

    markColDefs: any;
    markRowData: any;

    assessmentInformation: any;
    sectionId: any;

    ngOnInit(): void {
        this.assessmentColDefs = getAssessmentCoMapping();
        this.markColDefs = getStudentMarks();
    }

    ngAfterViewInit() {
        this.assessmentAgGrid.api.sizeColumnsToFit();
        this.markAgGrid.api.sizeColumnsToFit();
    }

    sectionChanged(values) {
        this.sectionId = values["id"];
        console.log(">> Got sectionId", this.sectionId);
        this.assessmentRowData = this.service.getAssessments(this.sectionId);
        this.service.getAssessments(this.sectionId)
        .subscribe(result => {
            this.assessmentInformation = result;
            // console.log('ass --', this.assessmentInformation);
        })
    }

    markAssessmentChanged(assessmentId) {
        // console.log("ass 2", assessmentId);
        this.markRowData = this.service.getStudentMarks(this.sectionId, assessmentId);
    }
}
