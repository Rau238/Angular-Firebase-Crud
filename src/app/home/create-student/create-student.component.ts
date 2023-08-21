import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  public studentForm: FormGroup;
  constructor(
    public studentServices: StudentService,
    public formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      student_course: ['', Validators.required],
      fees: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  async onSubmit() {
    await this.studentServices.createStudent(this.studentForm.value);
    this.studentForm.reset();
    this.router.navigate(['list-student']);
  }

  register() {
    this.auth.logout();
  }
}
