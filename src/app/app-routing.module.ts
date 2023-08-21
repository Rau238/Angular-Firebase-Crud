import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './home/create-student/create-student.component';
import { ListStudentsComponent } from './home/list-students/list-students.component';
import { EditStudentComponent } from './home/edit-student/edit-student.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectUnauthorizedToHome = () => redirectLoggedInTo(['/create']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'create',
    component: CreateStudentComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  { path: 'list-student', component: ListStudentsComponent },
  { path: 'update-student/:id', component: EditStudentComponent },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectUnauthorizedToHome),
  },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
