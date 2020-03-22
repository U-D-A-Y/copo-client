import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { LeftBarComponent } from './left-bar/left-bar.component';

import { LeftBarAdminComponent } from './left-bar/left-bar-admin/left-bar-admin.component';
import { LeftBarFacultyComponent } from './left-bar/left-bar-faculty/left-bar-faculty.component';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import { CourseSectionSelectorComponent } from './common/components/course-section-selector/course-section-selector.component';

@NgModule({
    declarations: [
        AppComponent,
        // LeftBarComponent,
        // LeftBarAdminComponent,
        // LeftBarFacultyComponent,
        // CourseSectionSelectorComponent
    ],
    imports: [
        BrowserModule,
        AgGridModule.withComponents([]),
        AdminModule,
        FacultyModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
