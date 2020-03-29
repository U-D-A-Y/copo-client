import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseSectionSelectorService } from './course-section-selector.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-course-section-selector',
    templateUrl: './course-section-selector.component.html',
    styleUrls: ['./course-section-selector.component.css']
})
export class CourseSectionSelectorComponent implements OnInit {
    constructor(
        private service: CourseSectionSelectorService, 
        private route: ActivatedRoute
    ) { }

    @Output() sectionValueSet = new EventEmitter();
    
    courses: any;
    courseSections: any;

    selectedCourse: any;
    selectedSection: any;

    ngOnInit() {
        this.selectedCourse = null;
        console.log("Section Selector Created");
        this.service.getRegistedCourses()
        .subscribe(result => {
            this.courses = result;
            this.courseSections = this.service.getSectionsOfSelectedCourse();

            this.selectedCourse = this.service.getSelectedCourseObject();
            this.selectedSection = this.service.getSelectedSectionObject();
            if (!this.selectedCourse) {
                this.selectedCourse = null;
            }

            if (this.selectedSection) {
                this.sectionChanged();
            } else {
                this.selectedSection = null;
            }
        })

        let courseCodeFromRoute = this.route.snapshot.paramMap.get('code');
        if (courseCodeFromRoute) {
            this.setCourseCodeFromRoute(courseCodeFromRoute);
        }
    }

    courseCompare(val1, val2): boolean {
        if (val2) {
            return val1["code"] == val2["code"];
        } else {
            return false;
        }
    }

    setCourseCodeFromRoute(courseCode) {
        let courseObject = {
            'code': courseCode
        };
        this.selectedCourse = courseObject;
        this.service.updateSelectedCourseObject(this.selectedCourse);
        this.courseSections = this.service.getSectionsOfSelectedCourse();

        // TODO: Temporary
        this.selectedSection = this.courseSections[0];
        this.sectionChanged();
    }

    /**
     * Change the sections array if the selected course changes
     * @param courseCode 
     */
    courseChanged() {
        this.service.updateSelectedCourseObject(this.selectedCourse);
        this.courseSections = this.service.getSectionsOfSelectedCourse();

        // set section to null
        this.selectedSection = null;
    }

    sectionChanged() {
        console.log("comp|section| courses array", this.courses);
        this.service.updateSelectedSection(this.selectedSection);

        let courseCode = this.selectedCourse["code"];
        let section = this.selectedSection["section"];
        let id = this.selectedSection["id"];

        this.sectionValueSet.emit({
            'course': courseCode,
            'section': section,
            'id': id
        });
    }
}
