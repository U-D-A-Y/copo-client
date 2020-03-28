import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { FacultyComponent } from './faculty/faculty.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

const appRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'faculty',
        component: FacultyComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard, RoleGuard]
    },
    {
        path: '',
        component: LoginComponent
    }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoutes,
            {
                // enableTracing: true
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
