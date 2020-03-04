import { Component, OnInit } from '@angular/core';

import { AdminDashboardService } from './admin-dashboard.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    providers: [AdminDashboardService],
})
export class AdminDashboardComponent implements OnInit {
    constructor(private service: AdminDashboardService) { }

    semester: any;
    year: any;

    ngOnInit(): void {
        this.service.getCurrentSemesterAndYear()
        .subscribe(curSem => {
            this.semester = curSem.semester;
            this.year = curSem.year;
        })
    }

}
