import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FacultyMarksService {
    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    proxyPrefix = '/api';

    getAssessments = (sectionId) => {
        const apiUrl = this.proxyPrefix + `/faculty/section/${sectionId}/assessments/`;
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                if (result["success"] === true) {
                    return result["data"];
                }
            })
        )
    }

    getStudentMarks = (sectionId, assessmentId) => {
        let apiUrl = this.proxyPrefix + `/faculty/marks/${sectionId}/${assessmentId}`;
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }
}
