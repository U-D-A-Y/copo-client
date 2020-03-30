import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminCoPoService {
    constructor(
        private http: HttpClient
    ) {}

    proxyPrefix = "/api";

    coPoMappingData: any;

    getAllCourses() {
        let apiUrl = this.proxyPrefix + '/admin/courses/offered/current';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }

    getCoPoMapping(courseCode) {
        let apiUrl = this.proxyPrefix + `/admin/copo/${courseCode}`;
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                if (result["success"]) {
                    let data = result["data"];
                    this.coPoMappingData = data;
                    return data;
                }
            })
        )
    }
    //     .then(result: <APIResponse> => {
    //         result = result.data;
    //         if (result.success) {
    //             let coPoMap = result.data;
    //             backUpCOPOMappingDate = JSON.parse(JSON.stringify(coPoMap));
    //             // add default CO 
    //             let allCo = ["CO1", "CO2", "CO3", "CO4"];
    //             for (let i=0; i<allCo.length; i++) {
    //                 let co = allCo[i];
    //                 if (!coPoMap.find(row => row.co === co)) {
    //                     coPoMap.splice(i, 0, {
    //                         co: co,
    //                         mapping: {}
    //                     })
    //                 }
    //             }
    //             console.log(coPoMap);
    //             populateGrid(colDefs.getCOPO(), coPoMap, copoAgGridOption);
    //         }
    //     })
    // }


}