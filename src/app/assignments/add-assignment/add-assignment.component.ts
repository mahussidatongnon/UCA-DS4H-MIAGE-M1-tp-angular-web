import { Component, OnInit } from '@angular/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // ajoutActive: boolean = false
  nomDevoir?: string
  dateDeRendu?: Date
  // @Output() nouvelAssignment = new EventEmitter<Assignment>()

  constructor(private assignmentService: AssignmentsService, private router: Router) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.ajoutActive = true
    // }, 2000)
  }


  onSubmit(event:any): void {
    const newAssignment = new Assignment();
    if (this.nomDevoir && this.dateDeRendu) {
        if(this.nomDevoir)  newAssignment.nom = this.nomDevoir;
        if(this.dateDeRendu)  newAssignment.dateDeRendu = this.dateDeRendu;
        newAssignment.id = this.assignmentService.generateId();
        newAssignment.rendu = false;
        this.assignmentService.addAssignment(newAssignment).subscribe(message => {
          console.log(message);
          this.router.navigate(['/home']);
        });
        
    }else {
        alert("Veuillez renseigner le nom du devoir et la date de rendu")
    }
  }

  

}
