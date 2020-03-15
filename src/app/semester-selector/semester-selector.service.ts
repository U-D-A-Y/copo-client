import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SemesterSelectorService {
    constructor(private http: HttpClient) {}
    proxyPrefix = "/api";

    semesterInfo: any;
    
    getCurrentSemesterAndYear() {
        if (this.semesterInfo) {
            return of(this.semesterInfo);
        }
        let semApiUrl = this.proxyPrefix + "/common/semester/current";
        return this.http.get(semApiUrl)
        .pipe(
            map(response => {
                this.semesterInfo = response["data"];
                return response["data"];
            }),
            catchError(err => {throw err})
        )
    }
}