import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class CourseSectionSelectorService {
    constructor(private http: HttpClient) {}

    private proxyPrefix = "/api";

    courseInformation: any;

    courseIdMap: any;
    sectionIdMap: any;

    selectedCourse: any;
    selectedSection: any;

    getRegistedCourses = () => {
        if (this.courseInformation) {
            console.log("has courseinformation", this.courseInformation);
            // return new Observable(this.courseInformation);
            return of(this.courseInformation);
        }
        let apiUrl = this.proxyPrefix + '/faculty/faculty/sections';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                // result = result["data"];
                console.log("section result", result["data"]);
                if (result["success"] === true) {
                    // return courseInformation = result.data;
                    // Add a selcted property
                    let data = result["data"];
                    for (let course in data) {
                        data[course]["selected"] = false;
                    }
                    this.courseInformation = data    // save it here
                    return data;
                }
            })
        )
    }

    getCourseInformation() {
        return this.courseInformation;
    }

    updateSelectedCourse(code) {
        // console.log(">> ", this.courseInformation);
        for (let course of this.courseInformation) {
            if (course["code"] === code) {
                course["selected"] = true;
            } else {
                course["selected"] = false;
            }
        }
    }
}