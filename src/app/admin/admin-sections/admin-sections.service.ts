import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminSectionService {
    constructor(
        private http: HttpClient
    ) {}

    proxyPrefix = "/api";

    getOfferedSections() {
        let apiUrl = this.proxyPrefix + "/admin/sections/offered/current"
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }
}