import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AdminReportService } from './admin-reports.service';
import { getStudentPoReport, getCoursePoReport, getCourseAndStudentPoReport} from '@common/colDefs';

@Component({
    selector: 'app-admin-reports',
    templateUrl: './admin-reports.component.html',
    styleUrls: ['./admin-reports.component.css'],
    providers: [AdminReportService]
})
export class AdminReportsComponent implements OnInit {

    constructor(
        private renderer: Renderer2,
        private service: AdminReportService
    ) { }

    reportColDefs: any;
    reportRowData: any;

    @ViewChild('reportAgGrid') reportAgGrid: AgGridAngular;

    pillText = "";
    coursePillTextList = [];
    studentPillTextList = [];

    ngOnInit(): void {

    }

    @ViewChild('coursePillBox') coursePillBox: ElementRef;
    @ViewChild('coursePillBoxholder') coursePillBoxholder: ElementRef;

    coursePillBoxKeyUp(event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            this.pillText = this.coursePillBox.nativeElement.value.trim();
            console.log(this.pillText);
            this.coursePillBox.nativeElement.value = '';
            let div = this.createpillBox(this.pillText, this.coursePillTextList, this.coursePillBoxholder.nativeElement);
            // coursePillBoxholder.appendChild(div);
            this.renderer.appendChild(this.coursePillBoxholder.nativeElement, div);
            this.coursePillTextList.push(this.pillText)
        }   
    }

    createpillBox(text, array, holder) {
        let div = this.renderer.createElement('div');
        div.className = 'parentPillDiv'
        let span = this.renderer.createElement('span')
        span.innerText = text;
        let btn = this.renderer.createElement('button')
        btn.className = 'btnPillBox'
        btn.innerText = 'X'
        btn.addEventListener('click', () => {
            let ind = array.indexOf(span.textContent);
            array.splice(ind, 1);
            // holder.removeChild(div);
            this.renderer.removeChild(holder, div);
        })
        this.renderer.appendChild(div, span);
        this.renderer.appendChild(div, btn);
        return div;
    }

    @ViewChild('studentPillBoxInput') studentPillBox: ElementRef;
    @ViewChild('studentPillBoxholder') studentPillBoxHolder: ElementRef;

    studentPillBoxKeyUp(event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            this.pillText = this.studentPillBox.nativeElement.value.trim();
            this.studentPillBox.nativeElement.value = '';
            let div = this.createpillBox(this.pillText, this.studentPillTextList, this.studentPillBoxHolder.nativeElement);
            // studentPillBoxholder.appendChild(div);
            this.renderer.appendChild(this.studentPillBoxHolder.nativeElement, div);
            this.studentPillTextList.push(this.pillText);
        }
    }

    generateReport() {
        console.log(this.coursePillTextList);
        console.log(this.studentPillTextList);
        this.reportRowData = [];
        if (this.coursePillTextList.length > 0 && this.studentPillTextList.length > 0) {
            this.reportColDefs = this.getCol('courseAndStudentPo');
            this.reportRowData = this.service.getCourseAndStudentReport(
                this.coursePillTextList, this.studentPillTextList
            )
        } else if (this.studentPillTextList.length > 0) {
            this.reportColDefs = this.getCol('studentPo');
            this.reportRowData = this.service.getStudentReport(this.studentPillTextList);
        }
        else if (this.coursePillTextList.length > 0) {
            this.reportColDefs = this.getCol('coursePo');
            this.reportRowData = this.service.getCourseReport(this.coursePillTextList);
        }
    }

    getCol(type) {
        switch (type) {
            case 'studentPo':
                return getStudentPoReport();
            case 'coursePo':
                return getCoursePoReport();
            case 'courseAndStudentPo':
                return getCourseAndStudentPoReport();
        }
    }
}
