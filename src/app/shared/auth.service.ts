import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  current_user?: User;
  currentToken?: string;
  currentTokenInfos?: any;
  base_api: string = environment.api_base_url;
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

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUrl(path: string): string {
    return this.base_api + path;
  }

  userIsAuthenticated(): Observable<boolean> {
    return of(this.loggedIn);
  }

  logIn(login: string, password: string): Observable<any> {
    return this.http.post(this.getUrl("/auth/login"), {username: login, password})
  }

  oldlogIn(login: string, password: string): boolean | undefined {
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

  setUserInfos(token: string): void {
    this.currentToken = token;
    let httpOptions = {
      headers: new HttpHeaders({
        "x-access-token": token
      })
    }
    this.http.get(this.getUrl("/auth/me"), httpOptions).subscribe({
      next: (data: any) => {
        let user: User = new User();
        user.login = data.user.name;
        user.role = data.user.role;
        this.current_user = user;
        this.loggedIn = true;
        this.currentTokenInfos = data.tokenInfos
        console.log("LogIN");
      },
      error: error => {
        alert(error.error.message)
      }
    });
  }

  getJWTToken(): string | undefined {
    return this.currentToken;
  }

}

