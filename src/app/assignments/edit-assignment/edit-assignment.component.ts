import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  assignment!: Assignment;
  nomAssignment!: string;
  dateDeRendu!: Date;

  constructor(private assignmentService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAssignment();

    // Affichages des query params et des fragments
    console.log("Query params : ", this.route.snapshot.queryParams);
    console.log("Fragment : ", this.route.snapshot.fragment);  
    if (this.route.snapshot.queryParams['nom']) {
      this.nomAssignment = this.route.snapshot.queryParams['nom'];
    }
    if (this.route.snapshot.queryParams['dateDeRendu']) {
      this.dateDeRendu = this.route.snapshot.queryParams['dateDeRendu'];
    }
  }
  
  getAssignment(): void {
    const id: number = Number(this.route.snapshot.params['id']);
    this.assignmentService.getAssignment(id).subscribe(assignment => {
      if (!assignment)  return;
      this.assignment = assignment;
      // Pré-remplissage des champs    
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    })
  }

  onSaveAssignment(): void {
    if (!this.assignment) return;
    
    // on récupère les valeurs des champs
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.rendu = false;
    this.assignmentService.updateAssignment(this.assignment).subscribe(message => {
      console.log(message);

      // navigation vers la page d'accueil
      this.router.navigate(['/home']);
    })
  } 
}
