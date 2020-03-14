import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FacultyReportsService {
    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    proxyPrefix = '/api';

    
}
