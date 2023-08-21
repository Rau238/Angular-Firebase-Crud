import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Student } from 'src/app/core/model/student.model';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.studentService.getStudentList().subscribe((res) => {
      this.students = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Student;
      });
    });
  }
  removeStudent(student: Student) {
    if (confirm('Are you sure you want to delete ' + student.name + '?')) {
      this.studentService.deleteStudent(student);
    }
  }
  register() {
    this.auth.logout();
  }
}
