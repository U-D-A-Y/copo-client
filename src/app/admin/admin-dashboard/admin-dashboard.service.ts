import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AdminDashboardService {

    constructor(private http: HttpClient) { }

    semApiUrl = "http://localhost:4200/api/common/semester/currentSemester";

    getCurrentSemesterAndYear() {
        return this.http.get(this.semApiUrl)
        .pipe(
            map(response => {
                return response["data"];
            })
        )
    }
}