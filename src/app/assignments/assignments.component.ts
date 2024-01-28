import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';
import { Student } from '../student.model';
import { Subject } from '../subject.model';
import { StudentsService } from '../shared/students.service';
import { SubjectsService } from '../shared/subjects.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  formVisible: boolean = false;
  assignments!: Assignment[];
    
  assignmentSelectionne!: Assignment

  page: number = 1;
  pageSize: number = 5;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;
  pageEvent!: PageEvent;
  disabled: boolean = false;
  showFirstLastButtons = true;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];
  filters = {
    nom: null as String | null,
    studentId: null as String | null,
    subjectId: null as String | null,
    rendu: null as String | null,
  };

  students: Student[] = [];
  subjects: Subject[] = [];
  selectedStudent = new FormControl('');


  constructor(
    private assignmentService: AssignmentsService,
    private studentService: StudentsService,
    private subjectService: SubjectsService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    // this.assignmentService.getAssignments().subscribe(assignments => {
    //   this.assignments = assignments;
    //   console.log("assignments subscribe");
    // });

    this.assignmentService.getAssignmentsPagine(this.page, this.pageSize, this.filters).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;  
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.pageSize = data.limit;
    });

    this.studentService.getStudents({page: 0, limit: 10, all: "true"}).subscribe(students => {
      this.students = students;
    });

    this.subjectService.getSubjects({page: 0, limit: 10}).subscribe(subjects => {
      this.subjects = subjects;
    });
  }
  
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  getStudents(): Student[] {
    if (!this.isAdmin()) {
       return [];
    }
    return this.students
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if (e.pageSize !== this.pageSize) {
      this.pageSize = e.pageSize;
      this.pageIndex = 0;
    }
    this.assignmentService.getAssignmentsPagine(this.pageIndex+1, this.pageSize, this.filters).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;  
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    });
  }

  applyFilter() {
    this.assignmentService.getAssignmentsPagine(this.page, this.pageSize, this.filters).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;  
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.pageSize = data.limit;
    });
  }

  resetFilters() {
    this.filters = { nom: null , studentId: null, subjectId: null, rendu: null };
    this.applyFilter();
  }

  setStudentFilter(student: Student) {
    this.selectedStudent.setValue(student._id.toString()); // Assurez-vous que _id est une chaîne
    this.filters.subjectId = student._id;
    this.applyFilter();
  }

  displayFn(student: Student): string {
    return student && student.firstName && student.lastName ? `${student.firstName} ${student.lastName}` : '';
  }

  isAdmin(): boolean {
    return this.authService.loggedIn && this.authService.current_user?.role === 'admin';
  }

}
