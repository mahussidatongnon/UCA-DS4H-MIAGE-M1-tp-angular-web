import { Component, OnInit } from '@angular/core';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';

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



  constructor(private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
    // this.assignmentService.getAssignments().subscribe(assignments => {
    //   this.assignments = assignments;
    //   console.log("assignments subscribe");
    // });

    this.assignmentService.getAssignmentsPagine(this.page, this.pageSize).subscribe(data => {
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
  
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if (e.pageSize !== this.pageSize) {
      this.pageSize = e.pageSize;
      this.pageIndex = 0;
    }
    this.assignmentService.getAssignmentsPagine(this.pageIndex+1, this.pageSize).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;  
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    });
  }
}
