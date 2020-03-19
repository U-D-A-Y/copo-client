import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FacultyCourseConfigService } from './course-config.service'

import { getStudentManagement, getAssessmentCoMapping, getAssessmentChooserColDef } from '@common/colDefs';
import { getAgGridAllData } from '@common/util';

import { AgGridAngular } from 'ag-grid-angular';
import { switchMap, filter, map } from 'rxjs/operators';
import { RowDataTransaction } from 'ag-grid-community';

@Component({
    selector: 'faculty-course-config',
    templateUrl: './course-config.component.html',
    styleUrls: ['./course-config.component.css'],
    providers: [FacultyCourseConfigService]
})
export class FacultyCourseConfigComponent implements OnInit {
    constructor(
        private service: FacultyCourseConfigService,
        private route: ActivatedRoute
    ) { }

    @ViewChild('studentAgGrid') studentAgGrid: AgGridAngular;
    @ViewChild('assessmentAgGrid') assessmentAgGrid: AgGridAngular;
    @ViewChild('allAssessmentsAgGrid') allAssessmentAgGrid: AgGridAngular;

    ngOnInit(): void {
        this.studentColDefs = getStudentManagement();
        this.assessmentColDefs = getAssessmentCoMapping();
        this.allAssessmentsColDefs = getAssessmentChooserColDef();

        this.allAssessments = this.service.getAllAssessments();
    }

    getAllAgGridData( ) {
        let data = getAgGridAllData(this.allAssessmentAgGrid);
        console.log("all data", data)
    }

    studentColDefs: any;
    studentRowData: any;

    assessmentColDefs: any;
    assessmentRowData: any;

    allAssessmentsColDefs: any;
    allAssessmentsRowData: any;

    allAssessments: any;

    ngAfterViewInit(): void {
        this.studentAgGrid.api.sizeColumnsToFit();
        this.assessmentAgGrid.api.sizeColumnsToFit();
    }

    sectionChanged(values) {
        let sectionId = values["id"];

        this.studentRowData = this.service.getStudents(sectionId);
        this.assessmentRowData = this.service.getAssessments(sectionId);
    }

    populateModalAssessments() {
        // Get already added assessments from Co/Po mapping grid
        let existingAssessmentData = getAgGridAllData(this.assessmentAgGrid);
        this.allAssessmentsRowData = this.service.getAllAssessments()
        .pipe(
            map(result => {
                let filteredData = result.filter(item => {
                    let found = existingAssessmentData.find(row => row["assessment"] === item["assessment"]);
                    if (!found) {
                        return true;
                    }
                })
                return filteredData;
            })
        )
        this.allAssessmentAgGrid.api.sizeColumnsToFit();
    }

    addAssessmentsToSection = () => {
        // let all = getAgGridAllData(this.allAssessmentAgGrid);
        // console.log("all data", all);
        let selectedRowData = this.allAssessmentAgGrid.api.getSelectedRows();
        // console.log("selected", selectedRowData);
        
        // transform the rows so it matches the assessment configuration
        selectedRowData = selectedRowData.map(row => {
            let dna = 'F';
            if (row["cbox"]) dna = 'T';
            return {
                'assessment': row["assessment"],
                'is_dna': dna,
                'mapping': row['mapping']
            }
        })
        // console.log("selected", selectedRowData);

        let transaction: RowDataTransaction = {
            add: selectedRowData
        }

        this.assessmentAgGrid.api.updateRowData(transaction);
    }

    saveAssessments() {
        let all = getAgGridAllData(this.assessmentAgGrid);
        console.log("as all", all);
    }
}
