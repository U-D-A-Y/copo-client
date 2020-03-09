import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class AdminStudentsService {
    constructor(private http: HttpClient) { }

    apiProxy = '/api';

    getStudentList () {
        const apiUrl = this.apiProxy + '/admin/students';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                // console.log(result);
                return result["data"];
            })
        )
    }
}
