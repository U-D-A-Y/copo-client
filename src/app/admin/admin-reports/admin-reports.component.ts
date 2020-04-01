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

    offeredCourseList: any;
    studentsList: any;

    reportColDefs: any;
    reportRowData: any;

    @ViewChild('reportAgGrid') reportAgGrid: AgGridAngular;

    pillText = "";
    coursePillTextList = [];
    studentPillTextList = [];

    ngOnInit(): void {
        this.service.getCurrentOfferedCourses()
        .subscribe(result => {
            this.offeredCourseList = result;
        })
        this.service.getAllStudents()
        .subscribe(result => {
            this.studentsList = result;
        })
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
            let offeredCoursePks = this.convertCourseCodeListToPk(this.coursePillTextList);
            let studentPKs = this.convertStudentIdToPk(this.studentPillTextList);
            this.reportRowData = this.service.getCourseAndStudentReport(
                offeredCoursePks, studentPKs
            )
        } else if (this.studentPillTextList.length > 0) {
            this.reportColDefs = this.getCol('studentPo');
            let pks = this.convertStudentIdToPk(this.studentPillTextList);
            this.reportRowData = this.service.getStudentReport(pks);
        }
        else if (this.coursePillTextList.length > 0) {
            this.reportColDefs = this.getCol('coursePo');
            let pks = this.convertCourseCodeListToPk(this.coursePillTextList)
            this.reportRowData = this.service.getCourseReport(pks);
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

    getOfferedCoursePkFromCourseCode(courseCode) {
        let found = this.offeredCourseList.find(course => {
            return course["course_code"] == courseCode
        })
        if (!found) {
            alert(`"${courseCode}" is not offered this semester`);
            return null;
        } else {
            return found["offered_course_pk"];
        }
    }

    convertCourseCodeListToPk(courseCodeList) {
        let pks = [];
        courseCodeList.forEach(code => {
            let pk = this.getOfferedCoursePkFromCourseCode(code);
            if (pk) {
                pks.push(pk);
            }
        });
        return pks;
    }

    convertStudentIdToPk(studentIdList) {
        let pks = [];
        studentIdList.forEach(id => {
            let found = this.studentsList.find(s => {
                return s["student_id"] === id
            })
            if (found) {
                pks.push(found["student_pk"]);
            }
        })
        return pks;
    }
}
