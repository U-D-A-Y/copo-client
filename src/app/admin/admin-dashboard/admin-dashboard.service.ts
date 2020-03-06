import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AdminDashboardService {

    constructor(private http: HttpClient) { }

    proxyPrefix = "/api";

    
    getCurrentSemesterAndYear() {
        let semApiUrl = this.proxyPrefix + "/api/common/semester/currentSemester";
        return this.http.get(semApiUrl)
        .pipe(
            map(response => {
                return response["data"];
            })
        )
    }

    getDashboardTotals() {
        const apiURL = this.proxyPrefix + `/admin/adminApi/dashboard/totals`;
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
        const apiUrl = this.proxyPrefix + `/admin/adminApi/semester/currentSemester`;
        return this.http.post(apiUrl, {
            data: {semester, year}
        })
        .pipe(
            map(result => {
                result = result["data"];
                return result;
            })
        )
        // .catch(err => {
        //     console.log(err);
        //     let reason = err.response.data;
        //     if (resson = 'ERR_EMPTY') {
        //         alert('Add this semester first');
        //     }
        //     throw err;
        // })
    }

    createUser(fi, fp) {
        const apiUrl = this.proxyPrefix + '/auth/createAccount';
        return this.http.post(apiUrl, {username: fi, password: fp, role: 'faculty'})
        .pipe(
            map(result => {
                result = result["data"];
                return result;
            })
        )
    }
}