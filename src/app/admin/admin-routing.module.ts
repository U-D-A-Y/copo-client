import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCourseFacultyComponent } from './admin-course-faculty/admin-course-faculty.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
            }, {
                path: 'course_faculty',
                component: AdminCourseFacultyComponent,
            }, {
                path: 'student',
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
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            routes
        )
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
