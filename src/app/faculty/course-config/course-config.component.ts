import { Component, OnInit } from '@angular/core';

import { FacultyCourseConfigService } from './course-config.service'

import {  getStudentManagement } from '@common/colDefs';
import { Router } from '@angular/router';

@Component({
    selector: 'faculty-course-config',
    templateUrl: './course-config.component.html',
    styleUrls: ['./course-config.component.css'],
    providers: [FacultyCourseConfigService]
})
export class FacultyCourseConfigComponent implements OnInit {
    constructor(private service: FacultyCourseConfigService,
        private router:Router) { }

    ngOnInit(): void {
        this.studentColDefs = getStudentManagement();
        console.log(this.router.url);
    }

    studentColDefs: any;
    studentRowData: any;

    sectionChanged(values) {
        console.log("IN config", values);
        let code = values["course"];
        let section = values["section"];
        let sectionId = values["id"];

        // this.service.getStudents(sectionId)
        // .subscribe(result => {
        //     console.log(result);
        //     this.studentRowData = result;
        // })
        this.studentRowData = this.service.getStudents(sectionId);
    }
}
