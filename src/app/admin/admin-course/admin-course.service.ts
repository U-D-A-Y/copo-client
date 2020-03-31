import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AdminCourseService {
    constructor(private http: HttpClient) { }
    apiProxy = "/api";

    getOfferedCourses() {
        let apiUrl = this.apiProxy + '/admin/courses/offered';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                // result = result["data"];
                if (result["success"]) {
                    return result["data"];
                } else {
                    return [];
                }
            }),
            catchError(error => {
                throw error;
            })
        )
    }
}
