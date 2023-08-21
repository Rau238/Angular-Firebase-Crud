import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  public editForm: FormGroup;
  studentRef: any;

  constructor(
    public studentService: StudentService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      student_course: ['', Validators.required],
      fees: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');
    if (id !== null) {
      this.studentService.getStudentDoc(id).subscribe((res) => {
        this.studentRef = res;
        this.editForm = this.formBuilder.group({
          name: [this.studentRef.name],
          email: [this.studentRef.email],
          student_course: [this.studentRef.student_course],
          fees: [this.studentRef.fees],
        });
      });
    }
  }
  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id') ?? undefined;
    this.studentService.updateStudent(this.editForm.value, id);
    this.router.navigate(['/list-student']);
  }

  register() {
    this.auth.logout();
  }
}
