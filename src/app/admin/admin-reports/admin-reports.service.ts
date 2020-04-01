import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminReportService {
    constructor(
        private http: HttpClient
    ) { }

    proxy = "/api";

    getAllStudents() {
        let apiUlr = this.proxy + '/admin/students';
        return this.http.get(apiUlr)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }

    getCurrentOfferedCourses() {
        let apiUrl = this.proxy + '/admin/courses/offered/current';
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                return result["data"];
            })
        )
    }

    getCourseAndStudentReport(course, student) {
        let courseQuery = this.getUrlformArray('course', course);
        let studentQuery = this.getUrlformArray('student', student);
        let combinedQuery = `${courseQuery}&${studentQuery}`;
        let apiURL = this.proxy + `/admin/report/po/course_student/?${combinedQuery}`;
        return this.http.get(apiURL)
        .pipe(
            map(result => {
                let data = result["data"];
                return this.courseAndStudentPrepareData(data);
            })
        )
    }

    getStudentReport(student) {
        let apiUrl = this.proxy + `/admin/report/po/student/?${this.getUrlformArray('student', student)}`
        return this.http.get(apiUrl)
        .pipe(
            map(result => {
                let data = result["data"];
                return this.studentPrepareData(data);
            })
        )
    }

    getCourseReport(course) {
        let apiURL = this.proxy + `/admin/report/po/course/?${this.getUrlformArray('course', course)}`;
        return this.http.get(apiURL)
        .pipe(
            map(result => {
                let data = result["data"];
                console.log("data", data);
                return this.coursePrepareData(data);
            })
        )
    }
    
    studentPrepareData(arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            let added = false;
            for (let j of arr[i].po_dist) {
                if (!added) {
                    data.push({
                        student_id: arr[i].student_id,
                        student_name: arr[i].student_name,
                        span: (arr[i].po_dist.length),
                        ...j
                    })
                    added = true;
                } else {
                    data.push(j);
                }
            }
        }
        return data;
    }

    coursePrepareData(arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            let added = false;
            for (let j of arr[i].po_dist) {
                if (!added) {
                    data.push({
                        course_code: arr[i].course_code,
                        span: (arr[i].po_dist.length),
                        ...j,
                    })
                    added = true;
                } else {
                    data.push(j);
                }
            }
        }
        return data;
    }

    courseAndStudentPrepareData(arr) {
        let data = [];
        for (let i = 0; i < arr.length; i++) {
            let courseAdded = false;
            console.log(arr[i]);
            for (let student of arr[i].students) {
                let studentAdded = false;
                for (let po of student.po_dist) {
                    if (!courseAdded) {
                        data.push({
                            course_code: arr[i].course_code,
                            student_id: student.student_id,
                            student_name: student.student_name,
                            courseSpan: arr[i].students.length * student.po_dist.length,
                            studentSpan: student.po_dist.length,
                            ...po,
                        });
                        courseAdded = true;
                        studentAdded = true;
                    } else {
                        if (!studentAdded) {
                            data.push({
                                student_id: student.student_id,
                                student_name: student.student_name,
                                studentSpan: student.po_dist.length,
                                ...po,
                            });
                            studentAdded = true;
                        } else {
                            data.push({
                                ...po
                            })
                        }
                    }
                }
            }
        }
        return data;
    }

    getUrlformArray(type, data) {
        let url = data.map(item => {
            return type + '[]=' + item.toString().toUpperCase()
        })
        return url.join('&')
    }
}