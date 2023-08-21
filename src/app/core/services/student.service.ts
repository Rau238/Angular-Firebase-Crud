import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private angularFirestore: AngularFirestore) {}

  getStudentDoc(id: string) {
    return this.angularFirestore.collection('student').doc(id).valueChanges();
  }

  getStudentList() {
    return this.angularFirestore.collection('student').snapshotChanges();
  }

  createStudent(student: Student) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('student')
        .add(student)
        .then(
          (Response) => {
            resolve(Response);
          },
          (error) => reject(error)
        );
    });
  }

  deleteStudent(student: Student) {
    return this.angularFirestore.collection('student').doc(student.id).delete();
  }

  updateStudent(student: Student, id: string | undefined) {
    return this.angularFirestore.collection('student').doc(id).update({
      name: student.name,
      email: student.email,
      student_course: student.student_course,
      fees: student.fees,
    });
  }
}
