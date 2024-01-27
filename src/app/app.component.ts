import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  titre: string = 'TP1';
  title: string = "Application de gestion des devoirs à rendre (Assignments)";
  sidenavOpened: boolean = false;
  loginLabel!: string;
  isLoggedLabael = "Connexion";
  isNotLoggedLabel = "Déconnexion";

  constructor(public authService: AuthService, private router: Router, private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
    this.loginLabel = this.authService.loggedIn ? this.isNotLoggedLabel : this.isLoggedLabael;
  }


  onChangeToggleLogin(event: MouseEvent): void { 
    event.preventDefault();       
    if (this.authService.loggedIn) {
      this.authService.logout();
      this.loginLabel = this.isLoggedLabael;
      // on renvoie vers la page home
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  
  onClickPeuplerBD(event: MouseEvent): void {
    event.preventDefault();
    this.assignmentService.peuplerBDAvecForkJoin().subscribe(message => {
      console.log(message);
      console.log("LA BD A ETE PEUPLEE");
      this.router.navigate(['/home'], {replaceUrl: true});
    });
  }

}
