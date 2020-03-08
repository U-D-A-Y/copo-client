import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCourseFacultyComponent } from './admin-course-faculty/admin-course-faculty.component';
import { AdminComponent } from './admin.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminCourseComponent } from './admin-course/admin-course.component';
import { AdminSectionsComponent } from './admin-sections/admin-sections.component';
import { AdminCopoComponent } from './admin-copo/admin-copo.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';


@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminCourseFacultyComponent,
        AdminComponent,
        AdminStudentsComponent,
        AdminCourseComponent,
        AdminSectionsComponent,
        AdminCopoComponent,
        AdminReportsComponent,
        AdminChartsComponent,
        AdminProfileComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        AgGridModule,
    ]
})
export class AdminModule { }
