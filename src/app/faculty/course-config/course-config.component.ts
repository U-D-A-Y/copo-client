import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FacultyCourseConfigService } from './course-config.service'

import {  getStudentManagement, getAssessmentCoMapping } from '@common/colDefs';
import { getAgGridAllData } from '@common/util';

import { AgGridAngular } from 'ag-grid-angular';
import { switchMap } from 'rxjs/operators';

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

    ngOnInit(): void {
        this.studentColDefs = getStudentManagement();
        this.assessmentColDefs = getAssessmentCoMapping();

        // this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) => 
        //         // console.log(params);
        //         // let x = params.get('code');
        //     )
        // )
    }

    getAll( ) {
        let data = getAgGridAllData(this.studentAgGrid);
        console.log("all data", data)
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
