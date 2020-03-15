import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { CourseSectionSelectorComponent } from './components/course-section-selector/course-section-selector.component';
import { SemesterSelectorComponent } from './components/semester-selector/semester-selector.component';

import { CourseSectionSelectorService } from './components/course-section-selector/course-section-selector.service';
import { SemesterSelectorService } from './components/semester-selector/semester-selector.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CourseSectionSelectorComponent,
        SemesterSelectorComponent
    ],
    providers: [
        CourseSectionSelectorService,
        SemesterSelectorService
    ],
    exports: [
        CourseSectionSelectorComponent,
        SemesterSelectorComponent
    ]
})
export class SharedModule { }