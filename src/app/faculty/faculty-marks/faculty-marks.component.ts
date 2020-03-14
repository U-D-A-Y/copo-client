import { Component, OnInit } from '@angular/core';

import { FacultyMarksService } from './faculty-marks.service';

import { getAssessmentCoMapping } from '@common/colDefs';
@Component({
    selector: 'faculty-marks',
    templateUrl: './faculty-marks.component.html',
    styleUrls: ['./faculty-marks.component.css'],
    providers: [ FacultyMarksService ],
})
export class FacultyMarksComponent implements OnInit {
    constructor(private service: FacultyMarksService) { }

    assessmentColDefs: any;
    assessmentRowData: any;

    ngOnInit(): void {
        this.assessmentColDefs = getAssessmentCoMapping();
    }

    sectionChanged(values) {
        let sectionId = values["id"];
        console.log(">> Got sectionId", sectionId);
        this.assessmentRowData = this.service.getAssessments(sectionId);
    }
}
