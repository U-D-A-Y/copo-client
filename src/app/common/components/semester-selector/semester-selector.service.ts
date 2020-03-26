import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Subject, onErrorResumeNext } from 'rxjs';

@Injectable()
export class SemesterSelectorService {
    constructor(private http: HttpClient) {}
    
    proxyPrefix = "/api";

    semesterInfo: any;
    
    public semesterSubject: Subject<any> = new Subject<any>();

    getCurrentSemesterAndYear() {
        if (this.semesterInfo) {
            console.log("Return Stored semester");
            this.semesterSubject.next(this.semesterInfo);
            return;
        }
        console.log("GETTING Semester from server");
        let semApiUrl = this.proxyPrefix + "/common/semester/current";
        this.http.get(semApiUrl)
        .pipe(
            map(response => {
                console.log("Semester response from server", response);
                this.semesterInfo = response["data"];
                return response["data"];
            }),
            catchError(err => {throw err})
        )
        .subscribe(
            result => this.semesterSubject.next(result),
            error => this.semesterSubject.error(error)
        )
    }

    refreshStoredSemester() {
        this.semesterInfo = null;
        this.getCurrentSemesterAndYear();
    }
}