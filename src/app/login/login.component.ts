import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: string;
  password!: string;
  hidePassword: boolean = true;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    console.log("login: " + this.login + " password: " + this.password);
    const logged = this.authService.logIn(this.login, this.password); 
    if (!logged) {
      alert("Login ou mot de passe incorrect");
    }else {
      this.router.navigate(['/home']);
    }
    
  }
}
