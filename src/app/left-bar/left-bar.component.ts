import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-left-bar',
    templateUrl: './left-bar.component.html',
    styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
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

}
