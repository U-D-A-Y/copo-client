import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LeftBarComponent } from './left-bar.component';
import { LeftBarAdminComponent } from './left-bar-admin/left-bar-admin.component';
import { LeftBarFacultyComponent } from './left-bar-faculty/left-bar-faculty.component';

@NgModule({
    declarations: [
        LeftBarComponent,
        LeftBarAdminComponent,
        LeftBarFacultyComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        LeftBarComponent
    ]
})
export class LeftBarModule {

}