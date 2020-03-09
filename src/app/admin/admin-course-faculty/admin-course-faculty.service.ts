import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AdminCourseFacultyService {
    constructor (private http: HttpClient) {}

    private proxyPrefix = "/api";

    getAllCourses() {
        let apiUrl = this.proxyPrefix + "/admin/courses";
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            }),
            catchError(error => {
                throw error;
            })
        )
    }

    getAllFaculty() {
        let apiUrl = this.proxyPrefix + '/admin/faculties'
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            }),
            catchError(error => {
                throw error;
            })
        )
    }
}