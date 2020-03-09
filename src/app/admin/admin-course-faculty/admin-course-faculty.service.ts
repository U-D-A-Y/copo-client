import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AdminCourseFacultyService {
    constructor (private http: HttpClient) {}

    private proxyPrefix = "/api";

    getAllCourses() {
        let apiUrl = this.proxyPrefix + "/admin/adminAPi/getAllCourses";
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
            // .then(result => {
            //     result = result.data;
            //     if (result.success) {
            //         return result.data;
            //     } else {
            //         return [];
            //     }
            // })
            // .catch(err => {
            //     console.log(err);
            // })
    }

    getAllFaculty() {
        let apiUrl = this.proxyPrefix + '/admin/adminApi/getAllFaculty'
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
            // .then(result => {
            //     result = result.data;
            //     if (result.success) {
            //         return result.data;
            //     } else {
            //         return [];
            //     }
            // })
            // .catch(err => {
            //     console.log(err);
            // })
    }
}