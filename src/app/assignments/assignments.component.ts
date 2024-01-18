import { Component, OnInit } from '@angular/core';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
    formVisible: boolean = false;
    assignments!: Assignment[];
    
  assignmentSelectionne!: Assignment

  constructor(private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
    this.assignmentService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
      console.log("assignments subscribe");
      
    });
  }
  
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  // onNouvelAssignment(event: Assignment) {
  //   this.assignmentService.addAssignment(event).subscribe(message => console.log(message));
  // }
  
  // onSupprimerAssignment(assignment: Assignment) {
  //   console.log("event_index", this.assignments.indexOf(assignment));
  //   this.assignments.splice(this.assignments.indexOf(assignment), 1);
  //   this.assignmentService.deleteAssignment(assignment).subscribe(message => console.log(message)); 
  // }
}
