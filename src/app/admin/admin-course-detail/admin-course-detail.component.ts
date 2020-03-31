import { Component, OnInit } from '@angular/core';
import { getAdminCourses} from '../../common/colDefs';
import { AdminCourseFacultyService } from '../admin-course-faculty/admin-course-faculty.service';

@Component({
  selector: 'app-admin-course-detail',
  templateUrl: './admin-course-detail.component.html',
  styleUrls: ['./admin-course-detail.component.css'],
  providers: [AdminCourseFacultyService]
})
export class AdminCourseDetailComponent implements OnInit {
  grid
  gridId="CourseId"
  courseColDefs:any=[]
 
  constructor(private service: AdminCourseFacultyService) { }

  ngOnInit(): void {
    
  }

  onGridReady(grid){
    this.grid=grid
    console.log(getAdminCourses())
    this.courseColDefs=getAdminCourses();
    this.grid.api.sizeColumnsToFit();
    this.grid.api.setRowData(this.service.getAllCourses());
  }

}
