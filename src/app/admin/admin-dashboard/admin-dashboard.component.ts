import { Component, OnInit, ViewChild } from '@angular/core';

import { AdminDashboardService } from './admin-dashboard.service';

import { getAdminSemester } from '@common/colDefs';

import * as alertify from 'alertifyjs';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject } from 'rxjs';
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

    facultyCount: Number;
    courseCount: Number;
    studentCount: Number;

    semesterColDefs: any;
    semesterRowData: any;

    eventSubject: Subject<void> = new Subject<void>();

    @ViewChild('semesterAgGrid') semesterAgGrid: AgGridAngular;

    ngOnInit(): void {
        this.service.getCurrentSemesterAndYear()
        .subscribe(curSem => {
            this.semester = curSem.semester;
            this.year = curSem.year;
        })

        this.service.getDashboardTotals()
        .subscribe(totals => {
            this.facultyCount = totals["faculty"];
            this.courseCount = totals["course"];
            this.studentCount = totals["student"];
        })

        
        this.semesterColDefs = getAdminSemester();
        this.semesterRowData = this.service.getAllSemesters();
    }

    ngAfterViewInit() {
        this.semesterAgGrid.api.sizeColumnsToFit();
    }

    // Propagate Semester Change
    propagateSemesterChange() {
        this.eventSubject.next();
    }

    // handleSemesterUpdate
    handleSemesterUpdate() {
        let selectedRows = this.semesterAgGrid.api.getSelectedRows();
        if (selectedRows.length == 0) {
            alert("Please select a semester first");
            return;
        }
        let semester = selectedRows[0].semester;
        let year = selectedRows[0].year;
        // console.log(selectedRows);
        this.service.updateCurrentSemester(semester, year)
        .subscribe(
            result => {
                alertify.success('Successfully Updated');
                this.propagateSemesterChange();
            },
            error => {
                alertify.error("Failed to update semester");
            }
        )
    }

    handleCreateUser(initial, password) {
        this.service.createUser(initial, password)
        .subscribe(
            result => {
                console.log(result);
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('successfully new user added');
            },
            error => {
                console.error(error);
                alertify.error("Error creating user");
            }
        )
    }
}
