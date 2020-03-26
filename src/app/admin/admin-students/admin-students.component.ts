import { Component, OnInit, ViewChild } from '@angular/core';

import { AdminStudentsService } from './admin-students.service';
import { getAdminStudents } from '../../common/colDefs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-admin-students',
    templateUrl: './admin-students.component.html',
    styleUrls: ['./admin-students.component.css'],
    providers: [AdminStudentsService]
})
export class AdminStudentsComponent implements OnInit {
    constructor(private service: AdminStudentsService) { }

    colDefs: any;
    rowData: any;

    @ViewChild('studentAgGrid') studentAgGrid: AgGridAngular;
    
    ngOnInit(): void {
        this.colDefs = getAdminStudents();
        this.rowData = this.service.getStudentList()
    }

    ngAfterViewInit() {
        this.studentAgGrid.api.sizeColumnsToFit();
    }
}
