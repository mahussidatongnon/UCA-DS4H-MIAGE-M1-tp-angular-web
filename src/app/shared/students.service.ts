import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Student } from '../student.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
    ) { }

  getStudents(params: any): Observable<any> {
    if (!params) {
      params = {};
    }
    return this.http.get<Student[]>(this.authService.getUrl("/students"), {params});
  }
}
