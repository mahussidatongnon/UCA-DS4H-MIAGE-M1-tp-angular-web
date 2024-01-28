
import { Component, OnInit, Input } from '@angular/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoggingService } from 'src/app/shared/logging.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/shared/auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-assignment-tab',
  templateUrl: './assignment-tab.component.html',
  styleUrls: ['./assignment-tab.component.css']
})

export class AssignmentTabComponent implements OnInit {

  formVisible: boolean = false;
  assignments!: Assignment[];
  assignment!: Assignment;
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu', 'subjectId', 'studentId'];
  @Input() dataSource: Assignment[] = [];
  constructor(private assignmentService: AssignmentsService, 
    private loggingService: LoggingService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    // this.assignmentService.getAssignments().subscribe(assignments => {
    //   this.assignments = assignments;
    // }); 
  }
  onRowClick(assignment: any) {
    this.assignment = assignment;
  }
  onAssignmentRendu() {    
    if(!this.assignment) return;
    this.assignment.rendu = true;
    this.assignmentService.updateAssignment(this.assignment).subscribe(message => {
      this.loggingService.log(this.assignment.nom, "modifié");
      console.log(message)
    });
    
  }

  onChangeToggleAssignment(newValue: MatSlideToggleChange, assignment: Assignment): void {    
    if (!this.authService.isAdmin()) {
      alert("Vous n'êtes pas admin. Connectez vous en tant qu'admin pour modifier les assignments");
      return;
    }
    assignment.rendu = newValue.checked;
    if(!assignment) return;
    this.assignmentService.updateAssignment(this.assignment).subscribe(message => {
      this.loggingService.log(this.assignment.nom, "modifié");
      console.log(message)
    });
  }

  isAdmin(): boolean {
    return this.authService.loggedIn && this.authService.current_user?.role === 'admin';
  }

  isAuthentified(): boolean {
    return this.authService.loggedIn;
  }
}
