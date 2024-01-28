import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { AuthService } from './auth.service';
import { UniversalAppInterceptor } from './universal-app-interceptor.service';

@Injectable({
  providedIn: 'root' // permet d'éviter les ajouts dans les modules
})
export class AssignmentsService {

  assignments!: Assignment[];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private logginService: LoggingService, private authService: AuthService, private http: HttpClient, private universalAppInterceptor: UniversalAppInterceptor) { }
  
  getUrl(endpoint: string): string {
    return this.authService.getUrl(endpoint);
  }

  getAssignments(): Observable<Assignment[]> {
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.getUrl("/assignments"));
  } 

  getAssignment(id: number): Observable<Assignment | undefined> {
    // const assignmentTrouve: Assignment|undefined = this.assignments.find(a => a.id === id);
    // return of(assignmentTrouve);
    return this.http.get<Assignment>(this.getUrl("/assignments/" + id)).pipe(
      map(assignment => {
        assignment.nom += " TRANSFORME AVEC PIPE";
        return assignment;
      }),
      tap(assignment => console.log("log depuis le tap", assignment)),
      // catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    )
  }

  getAssignmentsPagine(page: number, limit: number, filters:any = {}): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // Ajouter des paramètres de filtre si présents
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });

    console.log("filters", filters);
    

    return this.http.get<any[]>(this.getUrl("/assignments"), {params});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation + " a échoué");
      console.log(error);
      return of(result as T);
    }
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post(this.getUrl("/assignments"), assignment, this.httpOptions);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.logginService.log(assignment.nom, "supprimé");
    return this.http.delete(this.getUrl("/assignments/" + assignment._id));
  }

  updateAssignment(assignment: Assignment): Observable<Object> {
    return this.http.put(this.getUrl("/assignments"), assignment, this.httpOptions);
  }

  generateId(): number {
    let id: number = Math.round(Math.random() * 1000)
    while(this.assignments.find(a => a.id === id)) {
      id = Math.round(Math.random() * 100)
    }
    return id
  }

  peuplerBD() {
    bdInitialAssignments.forEach(assignment => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = assignment.id;
      nouvelAssignment.nom = assignment.nom;
      nouvelAssignment.dateDeRendu = new Date(assignment.dateDeRendu.$date);
      nouvelAssignment.rendu = assignment.rendu;
      this.addAssignment(nouvelAssignment).subscribe(message => console.log(message));
    });
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];
    bdInitialAssignments.forEach(assignment => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = assignment.id;
      nouvelAssignment.nom = assignment.nom;
      nouvelAssignment.dateDeRendu = new Date(assignment.dateDeRendu.$date);
      nouvelAssignment.rendu = assignment.rendu;
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment)
  }
}
