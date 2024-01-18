import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  current_user?: User;
  users: User[] = [
    {
      "login": "user1",
      "password": "password1",
      "role": "user"
    },
    {
      "login": "user2",
      "password": "password2",
      "role": "user"
    },
    {
      "login": "admin",
      "password": "admin",
      "role": "admin"
    },
    {
      "login": "user4",
      "password": "password4",
      "role": "user"
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  userIsAuthenticated(): Observable<boolean> {
    return of(this.loggedIn);
  }

  logIn(login: string, password: string): boolean | undefined {
    const user = this.users.find(user => user.login === login && user.password === password);
    if (user) {
      this.current_user = user;
      this.loggedIn = true;
      console.log("LogIN");
      
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.current_user = undefined;
    console.log("LogOut");
  } 

  isLogged(): Promise<boolean> {
    const isUserLogged: Promise<boolean> =  new Promise((resolve, reject) => {
      if (this.loggedIn) {
        console.log("Vous êtes connecté, navigation autorisée");
        resolve(true);
      }
      else {
        console.log("Vous n'êtes pas connecté, navigation interdite");
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
    return isUserLogged;
  }

  isAdmin(): Promise<boolean> {
    const isUserAdmin: Promise<boolean> =  new Promise((resolve, reject) => {
      if (!this.loggedIn) {
        console.log("Vous n'êtes pas connecté, navigation interdite");
        this.router.navigate(['/home']);
      } else {
        if (this.current_user?.role === "admin") {
          console.log("Vous êtes connecté en tant qu'admin, navigation autorisée");
          resolve(true);
        }
        else {
          console.log("Vous n'êtes pas admin, navigation interdite");
          resolve(false);
        }
      }
    });
    return isUserAdmin;
  }

}

