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

    markAgGridContext: MarkAgGridContext;

    ngOnInit(): void {
        this.assessmentColDefs = getAssessmentCoMapping('marks');
        this.markColDefs = getStudentMarks({});
    }

    ngAfterViewInit() {
        this.assessmentAgGrid.api.sizeColumnsToFit();
        this.markAgGrid.api.sizeColumnsToFit();

        this.assessmentAgGrid.gridOptions.getRowNodeId = (data) => {
            return data.id;
        }

        this.markAgGridContext = <MarkAgGridContext> {
            selectedAssessment: {}
        }
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
        console.log("ass 2", assessmentId);
        let selectedAssessmentData = this.assessmentInformation.find(item => item.id == assessmentId);
        // console.log("sel data", selectedAssessmentData);
        this.markRowData = this.service.getStudentMarks(this.sectionId, assessmentId);

        this.markAgGridContext.selectedAssessment = selectedAssessmentData;
        console.log("context", this.markAgGridContext);

        this.markAgGrid.api.setColumnDefs(getStudentMarks(selectedAssessmentData));
        this.markAgGrid.api.sizeColumnsToFit();
        this.markAgGrid.gridOptions.context = this.markAgGridContext;
        this.markAgGrid.api.refreshCells();
        this.markAgGrid.api.refreshHeader();

        let rowNodeToSelect = this.assessmentAgGrid.api.getRowNode(assessmentId);
        console.log("selected", rowNodeToSelect);
        rowNodeToSelect.setSelected(true, true);
    }
}

interface MarkAgGridContext {
    selectedAssessment: {};
}