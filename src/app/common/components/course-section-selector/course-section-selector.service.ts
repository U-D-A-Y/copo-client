import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class CourseSectionSelectorService {
    constructor(private http: HttpClient) {}

    private proxyPrefix = "/api";

    courseInformation: any;

    selectedCourseObject: any;
    selectedSectionObject: any;

    getRegistedCourses = () => {
        if (this.courseInformation) {
            // console.log("has courseinformation", this.courseInformation);
            let dataForComponent = this.formatCourseInfoForComponent(this.courseInformation);
            return of(dataForComponent);
        }
        let apiUrl = this.proxyPrefix + '/faculty/faculty/sections';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                // console.log("section result", result["data"]);
                if (result["success"] === true) {
                    let data = result["data"];
                    this.courseInformation = this.formatCourseInfoForStore(data);
                    let dataForComponent = this.formatCourseInfoForComponent(this.courseInformation);
                    return dataForComponent;
                }
            })
        )
    }

    getSelectedCourseCode() {
        let courseObject = this.selectedCourseObject;
        if (courseObject) {
            return courseObject["code"];
        } else {
            return null;
        }
    }

    getSelectedCourseObject() {
        return this.selectedCourseObject;
    }

    getSelectedSectionObject() {
        return this.selectedSectionObject;
    }

    getSectionsOfSelectedCourse() {
        let selectedCourseCode = this.getSelectedCourseCode();
        if (selectedCourseCode && this.courseInformation) {
            let sections = this.courseInformation[selectedCourseCode];
            return sections;
        } else {
            return [];
        }
    }

    updateSelectedCourseObject(courseObject) {
        this.selectedCourseObject = courseObject;
        this.selectedSectionObject = null;      // Invalidate saved section
    }

    updateSelectedSection(sectionObject) {
        this.selectedSectionObject = sectionObject;
    }

    formatCourseInfoForStore(coursesArray) {
        let formattedObj = {};
        for (let courseObject of coursesArray) {
            let courseCode = courseObject["code"];
            let sectionsArray = courseObject["section"];
            formattedObj[courseCode] = sectionsArray;
        }
        return formattedObj;
    }

    /**
     * A Course Array will be sent to component;
     * 
     * Format for the Array will be as follows:
     * Assuming the 'CSE123' course is currently selected course;
     * Courses:  [{'code': 'CSE123', 'selected': true} .... { ... 'selected': false} ]
     */
    formatCourseInfoForComponent(courseInformation) {
        let selectedCourseCode = this.selectedCourseObject;

        let coursesArray = [];
        for (let courseCode in courseInformation) {
            coursesArray.push({
                'code': courseCode
            })
        }
        return coursesArray;
    }
}