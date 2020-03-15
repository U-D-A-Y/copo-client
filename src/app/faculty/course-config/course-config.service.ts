import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class FacultyCourseConfigService {

    constructor(private http: HttpClient) { }

    proxyPrefix = "/api";

    
    getStudents(sectionId) {
        let apiUrl = this.proxyPrefix + `/faculty/section/${sectionId}/students/`;
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                console.log(result);
                if (result["success"] === true) {
                    // studentsInformation = result.data;
                    // populateStudent(result.data, studentAgGridOption);
                    return result["data"];
                }
            })
        )
    }

    /**
     * Get the assessments of a section
     * @memberof FacultyCourseConfigService
     */
    getAssessments = (sectionId) => {
        const apiUrl = this.proxyPrefix + `/faculty/section/${sectionId}/assessments`;
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }
}