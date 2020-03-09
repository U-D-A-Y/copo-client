import { Component, OnInit } from '@angular/core';

import { AdminStudentsService } from './admin-students.service';
import { getAdminStudents } from '../../common/colDefs';

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
    
    ngOnInit(): void {
        this.colDefs = getAdminStudents();
        this.rowData = this.service.getStudentList()
    }

}
