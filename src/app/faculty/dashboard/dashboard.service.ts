import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class FacultyDashboardService {
    constructor(private http: HttpClient) { }

    proxyPrefix = "/api";

    getSectionDetails() {
        const apiUrl = this.proxyPrefix + '/faculty/dashboard/sectionDetail';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                console.log(result);
                return result["data"];
            })
        )
    }
}