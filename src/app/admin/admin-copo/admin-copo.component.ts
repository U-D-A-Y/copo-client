import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdminCoPoService } from './admin-copo.service';
import { getCOPO } from '@common/colDefs';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
    selector: 'app-admin-copo',
    templateUrl: './admin-copo.component.html',
    styleUrls: ['./admin-copo.component.css'],
    providers: [AdminCoPoService]
})
export class AdminCopoComponent implements OnInit, AfterViewInit {
    constructor(
        private service: AdminCoPoService
    ) { }

    allCourses: any;
    selectedCoursePk: any = "";

    copoColDefs: any;
    copoRowData: any;

    @ViewChild('copoAgGrid') copoAgGrid: AgGridAngular;

    ngOnInit(): void {
        this.copoColDefs = getCOPO();
        this.allCourses = this.service.getAllCourses();
    }
    
    ngAfterViewInit() {
        this.copoAgGrid.api.sizeColumnsToFit();
    }
    
    courseChanged() {
        this.copoRowData = this.service.getCoPoMapping(this.selectedCoursePk);
    }
}
