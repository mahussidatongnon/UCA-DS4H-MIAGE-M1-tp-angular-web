
import { Component, OnInit, Input } from '@angular/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-assignment-tab',
  templateUrl: './assignment-tab.component.html',
  styleUrls: ['./assignment-tab.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule, 
    MatCheckboxModule,

  ],
})

export class AssignmentTabComponent implements OnInit {

  formVisible: boolean = false;
  assignments!: Assignment[];
  assignment!: Assignment;
  displayedColumns: string[] = ['number', 'name', 'date', 'matiere', 'student', 'rendu', 'actions'];
  @Input() dataSource = this.assignments;
  constructor(private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignmentService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
    }); 
  }
  onRowClick(assignment: any) {
    this.assignment = assignment;
  }
  onAssignmentRendu() {    
    if(!this.assignment) return;
    this.assignment.rendu = true;
    this.assignmentService.updateAssignment(this.assignment).subscribe(message => {
      console.log(message)
    });
    
  }

}
