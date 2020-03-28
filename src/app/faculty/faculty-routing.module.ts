import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacultyComponent } from './faculty.component';

import { FacultyDashboardComponent } from './dashboard/dashboard.component';
import { FacultyCourseConfigComponent } from './course-config/course-config.component';
import { FacultyMarksComponent } from './faculty-marks/faculty-marks.component';
import { FacultyReportsComponent } from './faculty-reports/faculty-reports.component';
import { FacultyProfileComponent } from './profile/profile.component';

import { AuthGuard } from '../guard/auth.guard';
import { RoleGuard } from '../guard/role.guard';
const routes: Routes = [
    {
        path: 'faculty',
        component: FacultyComponent,
        canActivateChild: [AuthGuard, RoleGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: FacultyDashboardComponent,
            }, {
                path: 'configcourse',
                component: FacultyCourseConfigComponent,
            }, {
                path: 'marks',
                component: FacultyMarksComponent,
            }, {
                path: 'reports',
                component: FacultyReportsComponent,
            }, {
                path: 'profile',
                component: FacultyProfileComponent,
            }, {
                path: 'charts',
                component: FacultyProfileComponent,
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
export class FacultyRoutingModule { }
