import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { FacultyRoutingModule } from './faculty-routing.module';

import { FacultyComponent } from './faculty.component';

import { FacultyDashboardComponent } from './dashboard/dashboard.component';
import { FacultyCourseConfigComponent } from './course-config/course-config.component';
import { FacultyProfileComponent } from './profile/profile.component';
import { FacultyMarksComponent } from './faculty-marks/faculty-marks.component';
import { FacultyReportsComponent } from './faculty-reports/faculty-reports.component';

import { CourseSectionSelectorComponent } from '../course-section-selector/course-section-selector.component';
import { CourseSectionSelectorService } from '../course-section-selector/course-section-selector.service';

import { SemesterSelectorComponent } from '../semester-selector/semester-selector.component';
import { SemesterSelectorService } from '../semester-selector/semester-selector.service';
@NgModule({
    declarations: [
        FacultyComponent,
        FacultyDashboardComponent,
        FacultyCourseConfigComponent, 
        FacultyProfileComponent, 
        FacultyMarksComponent, 
        FacultyReportsComponent,
        CourseSectionSelectorComponent,
        SemesterSelectorComponent,
    ],
    imports: [
        CommonModule,
        FacultyRoutingModule,
        AgGridModule,
    ],
    providers: [
        CourseSectionSelectorService,
        SemesterSelectorService,
    ]
})
export class FacultyModule { }
