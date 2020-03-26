import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AdminDashboardService {

    constructor(private http: HttpClient) { }

    proxyPrefix = "/api";

    getAllSemesters() {
        let apiURL = this.proxyPrefix + "/admin/semesters";
        return this.http.get(apiURL)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }
    
    getCurrentSemesterAndYear() {
        let semApiUrl = this.proxyPrefix + "/common/semester/current";
        return this.http.get(semApiUrl)
        .pipe(
            map(response => {
                return response["data"];
            }),
            catchError(err => {throw err})
        )
    }

    getDashboardTotals() {
        const apiURL = this.proxyPrefix + `/admin/dashboard/totals`;
        return this.http.get(apiURL)
        .pipe(
            map(result => {
                console.log(result);
                result = result["data"];
                return result;
            })
        )
    }

    updateCurrentSemester = (semester, year) => {
        const apiUrl = this.proxyPrefix + `/admin/semester/current`;
        return this.http.post(apiUrl, {
            data: {semester, year}
        })
        .pipe(
            map(result => {
                result = result["data"];
                return result;
            }),
            catchError(error => {
                let reason = error["response"]["data"];
                if (reason === 'ERR_EMPTY') {
                    alert('Add this semester first');
                }
                throw error;
            })
        )
    }

    createUser(fi, fp) {
        const apiUrl = this.proxyPrefix + '/auth/account';
        return this.http.post(apiUrl, {username: fi, password: fp, role: 'faculty'})
        .pipe(
            map(result => {
                result = result["data"];
                return result;
            })
        )
    }
}