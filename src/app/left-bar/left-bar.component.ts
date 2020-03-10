import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
        // console.log(this.route);
        // console.log(this.router);
        // let url = this.router.routerState.snapshot.url;
        // console.log("state --- ", this.router.routerState);
        // console.log("url ------", url);
        // this.role = url.split('/')[0];
        // console.log("router----", this.role);
        this.role = 'admin';
    }

}
