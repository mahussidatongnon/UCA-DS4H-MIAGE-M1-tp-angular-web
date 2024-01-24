import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule}   from '@angular/material/button';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component'
import { RenduDirective } from './shared/rendu.directive';
import { AppRoutingModule } from './app-routing.module';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from './login/login.component'; // CLI imports AppRoutingModule


import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalAppInterceptor } from './shared/universal-app-interceptor.service';

/** Provider for the Noop Interceptor. */
export const noopInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true };

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule, 
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  providers: [
    noopInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
