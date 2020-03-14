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
        // TODO: This works but I don't like this. Try to improve
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
        ).subscribe(res => {
            // console.log("nav end", res);
            let url = res["url"];
            let role = url.split("/")[1];
            // console.log("role", role);
            this.role = role;
        })
    }

}
