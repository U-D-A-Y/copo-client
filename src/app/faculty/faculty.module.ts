import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule } from '@common/shared.module';
import { GridModule } from '@common/grid-components/grid.module';

import { FacultyRoutingModule } from './faculty-routing.module';

import { FacultyComponent } from './faculty.component';

import { FacultyDashboardComponent } from './dashboard/dashboard.component';
import { FacultyCourseConfigComponent } from './course-config/course-config.component';
import { FacultyProfileComponent } from './profile/profile.component';
import { FacultyMarksComponent } from './faculty-marks/faculty-marks.component';
import { FacultyReportsComponent } from './faculty-reports/faculty-reports.component';
import { from } from 'rxjs';
@NgModule({
    declarations: [
        FacultyComponent,
        FacultyDashboardComponent,
        FacultyCourseConfigComponent, 
        FacultyProfileComponent, 
        FacultyMarksComponent, 
        FacultyReportsComponent,
    ],
    imports: [
        CommonModule,
        FacultyRoutingModule,
        AgGridModule,
        SharedModule,
        GridModule
    ],
    providers: [
    ]
})
export class FacultyModule { }
