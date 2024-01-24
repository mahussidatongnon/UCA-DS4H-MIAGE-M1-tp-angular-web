import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  constructor(private assignmentService: AssignmentsService, 
            private route: ActivatedRoute,
            private router: Router,
            private authService: AuthService) { }

  assignmentTransmis?:Assignment;
  // @Output() supprimerAssignment = new EventEmitter<Assignment>();

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(): void {
    const id: number = Number(this.route.snapshot.params['id']);
    this.assignmentService.getAssignment(id).subscribe({
      next: assignment => this.assignmentTransmis = assignment,
      error: error => alert(error.error.message + "(getAssignment)")  
    });
  }

  onAssignmentRendu() {    
    // this.assignmentTransmis.rendu = true;
    if(!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = true;
    this.assignmentService.updateAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message)
      this.router.navigate(['/home']);
    });
    
  }

  onSupprimerAssignment() {    
    if(!this.assignmentTransmis) return;

    this.assignmentService.deleteAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message)
      this.assignmentTransmis = undefined;
      this.router.navigate(['/home']);
    }); 
  }

  onClickEdit(): void {
    if(!this.assignmentTransmis) return;
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
  }

  isAdmin(): boolean {
    return this.authService.loggedIn && this.authService.current_user?.role === 'admin';
  }
}
