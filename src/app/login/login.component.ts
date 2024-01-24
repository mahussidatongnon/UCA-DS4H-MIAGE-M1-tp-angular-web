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
    const logged = this.authService.logIn(this.login, this.password).subscribe({
      next: data => {
        console.log(data);
        this.authService.loggedIn = true;
        this.authService.setUserInfos(data.token)
        this.router.navigate(['/home']);
      },
      error: error => {
        alert(error.error.message)
      }
    });
  }
}
