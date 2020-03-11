import { Component, OnInit } from '@angular/core';
import { CourseSectionSelectorService } from './course-section-selector.service';
@Component({
    selector: 'app-course-section-selector',
    templateUrl: './course-section-selector.component.html',
    styleUrls: ['./course-section-selector.component.css']
})
export class CourseSectionSelectorComponent implements OnInit {
    constructor(private service: CourseSectionSelectorService) { }

    courses: any;
    sections: any;

    ngOnInit() {
        console.log("Selector Created");
        this.service.getRegistedCourses()
        .subscribe(result => {
            console.log("res in component", result);
            this.courses = this.extractCourses(result);
        })
        // this.courses = ['A', 'B', 'C'];
        this.sections = [1, 2, 3];
    }

    extractCourses = (courseInformation) => {
        let courses = courseInformation.map(data => {
            return {
                code: data["code"],
                selected: data["selected"]
            }
        });
        return courses;
    }

    /**
     * Change the sections array if the selected course changes
     * @param course 
     */
    courseChanged(course) {
        console.log("comp | courses array", this.courses);
        let courseInformation = this.service.getCourseInformation();
        let sections = courseInformation.find(data => data["code"] === course).section.map(row => row["section"]);
        this.sections = sections;

        this.service.updateSelectedCourse(course);
    }

    sectionChanged() {
        console.log("comp|section| courses array", this.courses);
    }
}
