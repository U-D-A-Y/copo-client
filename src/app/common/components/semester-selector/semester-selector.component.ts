import { Component, OnInit } from "@angular/core";
import { SemesterSelectorService } from './semester-selector.service';
@Component({
    selector: 'app-semester-selector',
    templateUrl: './semester-selector.component.html',
    styleUrls: ['./semester-selector.component.css']
})
export class SemesterSelectorComponent implements OnInit {
    constructor(private service: SemesterSelectorService) {}

    semesterInfo = {
        year: '',
        semester: '',
    };

    ngOnInit() {
        console.log("hello from semester");
        this.service.getCurrentSemesterAndYear()
        .subscribe(val => {
            console.log(">> Got semester", val);
            this.semesterInfo = val;
        })
    }

}