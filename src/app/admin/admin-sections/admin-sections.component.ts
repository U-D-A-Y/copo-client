import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { AdminSectionService } from './admin-sections.service';

import { getAdminSections } from '@common/colDefs';

@Component({
    selector: 'app-admin-sections',
    templateUrl: './admin-sections.component.html',
    styleUrls: ['./admin-sections.component.css'],
    providers: [AdminSectionService]
})
export class AdminSectionsComponent implements OnInit, AfterViewInit {
    colDefs: any;
    rowData: any;

    @ViewChild('sectionAgGrid') sectionAgGrid: AgGridAngular;
    
    constructor(
        private service: AdminSectionService
    ) { }

    ngOnInit(): void {
        this.colDefs = getAdminSections();
        this.rowData = this.service.getOfferedSections();
    }

    ngAfterViewInit() {
        this.sectionAgGrid.api.sizeColumnsToFit();
    }
}
