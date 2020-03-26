import { Component, OnInit, Input } from "@angular/core";
import { SemesterSelectorService } from './semester-selector.service';
import { Observable, Subscription } from 'rxjs';
@Component({
    selector: 'app-semester-selector',
    templateUrl: './semester-selector.component.html',
    styleUrls: ['./semester-selector.component.css']
})
export class SemesterSelectorComponent implements OnInit {
    constructor(private service: SemesterSelectorService) {}
    
    private eventSubscription: Subscription;
    @Input() refreshSemester: Observable<void>;
    
    semesterInfo = {
        year: '',
        semester: '',
    };
    

    private semesterSubscription: Subscription;
    
    ngOnInit() {
        console.log("Semester component initialized");
        this.semesterSubscription = this.service.semesterSubject
        .subscribe(val => {
            console.log(">> Got semester from service", val);
            this.semesterInfo = val;
        })
        // Call the function for the first time;
        this.service.getCurrentSemesterAndYear();

        // When parent updates semester, refresh the current semester;
        this.eventSubscription = this.refreshSemester.subscribe( () => {
            // console.log("I've got semester change notification");
            this.refreshCurrentSemester();
        })
    }

    ngOnDestroy() {
        this.semesterSubscription.unsubscribe();
        this.eventSubscription.unsubscribe();
    }

    refreshCurrentSemester() {
        this.service.refreshStoredSemester();
    }
}