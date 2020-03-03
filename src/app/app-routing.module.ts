import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AdminModule} from './admin/admin.module';

import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminCourseFacultyComponent} from './admin/admin-course-faculty/admin-course-faculty.component';

const appRoutes: Routes = [
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
    }, {
        path: 'admin/course_faculty',
        component: AdminCourseFacultyComponent,
    }, {
        path: 'admin/student',
        component: AdminDashboardComponent,
    }, {
        path: 'course_offering',
        component: AdminDashboardComponent,
    }, {
        path: 'section_offering',
        component: AdminDashboardComponent,
    }, {
        path: 'copo_mapping',
        component: AdminDashboardComponent,
    }, {
        path: 'reports',
        component: AdminDashboardComponent,
    }, {
        path: 'charts',
        component: AdminDashboardComponent,
    }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
