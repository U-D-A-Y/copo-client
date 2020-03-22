import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap, filter, map } from 'rxjs/operators';
import { LeftBarService } from './left-bar.service';

@Component({
    selector: 'app-left-bar',
    templateUrl: './left-bar.component.html',
    styleUrls: ['./left-bar.component.css'],
    providers: [ LeftBarService ]
})
export class LeftBarComponent implements OnInit {

    constructor(
        private service: LeftBarService,
        private route: ActivatedRoute,
    ) { }

    role: any;

    ngOnInit(): void {
        // console.log("route", this.route.snapshot);
        // this.route.url.subscribe(url => {
        //     console.log("route url", url);
        // })
        // console.log(this.route.routeConfig);
        this.role = this.route.routeConfig.path;
    }

    logOut() {
        this.service.logOut()
        .subscribe(result => {

        })
    }

}
