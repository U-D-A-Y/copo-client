import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseSectionSelectorService } from './course-section-selector.service';

@Component({
    selector: 'app-course-section-selector',
    templateUrl: './course-section-selector.component.html',
    styleUrls: ['./course-section-selector.component.css']
})
export class CourseSectionSelectorComponent implements OnInit {
    constructor(private service: CourseSectionSelectorService) { }

    @Output() sectionValueSet = new EventEmitter();
    
    courses: any;
    sections: any;

    ngOnInit() {
        console.log("Selector Created");
        this.service.getRegistedCourses()
        .subscribe(result => {
            console.log("res in component", result);
            this.courses = this.extractCourses(result);
            
            let selectedCourse = this.service.getSelectedCourse();
            console.log("IN COMP, sel crs", selectedCourse);
            if (selectedCourse) {
                this.sections = this.extractSections(selectedCourse);
                console.log("sections", this.sections);
                let selectedSection = this.service.getSelectedSection();
                if (selectedSection) {
                    this.sectionChanged(selectedSection);
                }
            }
        })
    }

    // Extract the Courses array
    extractCourses = (courseInformation) => {
        let courses = courseInformation.map(data => {
            return {
                code: data["code"],
                selected: data["selected"]
            }
        });
        return courses;
    }

    extractSections(courseCode) {
        let courseInformation = this.service.getCourseInformation();
        let sections = courseInformation.find(data => data["code"] === courseCode).section;
        return sections;
    }

    /**
     * Change the sections array if the selected course changes
     * @param course 
     */
    courseChanged(course) {
        console.log("comp | courses array", this.courses);
        this.sections = this.extractSections(course);
        this.service.updateSelectedCourse(course);
    }

    sectionChanged(section) {
        console.log("comp|section| courses array", this.courses);
        let updated = this.service.updateSelectedSection(section);

        this.sectionValueSet.emit({
            'course': updated[0],
            'section': updated[1],
            'id': updated[2]
        });
    }
}
