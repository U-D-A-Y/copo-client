import { Component, OnInit } from '@angular/core';
import { FacultyDashboardService } from './dashboard.service';

@Component({
    selector: 'faculty-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [ FacultyDashboardService ]
})
export class FacultyDashboardComponent implements OnInit {

    constructor(private service: FacultyDashboardService) { }

    sectionInformation: any;

    ngOnInit(): void {
        // console.error("Dashboard Created");
        this.sectionInformation = this.service.getSectionDetails();
    }
}
