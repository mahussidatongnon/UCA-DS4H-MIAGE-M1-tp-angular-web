import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        component: AssignmentsComponent
    },
    {
        path: 'home',
        component: AssignmentsComponent
    },
    {
        path: 'add',
        component: AddAssignmentComponent
    },
    {
        path: 'assignment/:id',
        component: AssignmentDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'assignment/:id/edit',
        component: EditAssignmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }