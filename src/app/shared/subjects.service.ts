import { Injectable } from '@angular/core';
import { Subject } from '../subject.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
    ) { }

  getSubjects(params: any): Observable<any> {
    if (!params) {
      params = {};
    }
    return this.http.get<Subject[]>(this.authService.getUrl("/subjects"), {params});
  }
}
