import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCourseFacultyComponent } from './admin-course-faculty/admin-course-faculty.component';
import { AdminCopoComponent } from './admin-copo/admin-copo.component';
import { AdminCourseComponent } from './admin-course/admin-course.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminSectionsComponent } from './admin-sections/admin-sections.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
            }, {
                path: 'course_faculty',
                component: AdminCourseFacultyComponent,
            }, {
                path: 'students',
                component: AdminStudentsComponent,
            }, {
                path: 'course_offering',
                component: AdminCourseComponent,
            }, {
                path: 'section_offering',
                component: AdminSectionsComponent,
            }, {
                path: 'copo',
                component: AdminCopoComponent,
            }, {
                path: 'reports',
                component: AdminReportsComponent,
            }, {
                path: 'charts',
                component: AdminDashboardComponent,
            }, {
                path: 'profile',
                component: AdminProfileComponent,
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
