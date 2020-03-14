import { Component, OnInit } from '@angular/core';

import { FacultyReportsService } from './faculty-reports.service';

@Component({
    selector: 'faculty-reports',
    templateUrl: './faculty-reports.component.html',
    styleUrls: ['./faculty-reports.component.css'],
    providers: [ FacultyReportsService ]
})
export class FacultyReportsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionChanged(values) {
        let sectionId = values["id"];
    }
}
