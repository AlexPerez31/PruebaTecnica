import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";

import { NavbarComponent } from "./navbar/navbar.component";

import { EventFormComponent } from "./forms/event-form/event-form.component";
import { SessionFormComponent } from "./forms/session-form/session-form.component";
import { UserFormComponent } from "./forms/user-form/user-form.component";

import { EventsTableComponent } from "./tables/events-table/events-table.component";
import { SessionsTableComponent } from "./tables/sessions-table/sessions-table.component";
import { UsersTableComponent } from "./tables/users-table/users-table.component";

@NgModule({
  declarations: [
    NavbarComponent,

    EventFormComponent,
    SessionFormComponent,
    UserFormComponent,

    EventsTableComponent,
    SessionsTableComponent,
    UsersTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  exports: [
    NavbarComponent,

    EventFormComponent,
    SessionFormComponent,
    UserFormComponent,

    EventsTableComponent,
    SessionsTableComponent,
    UsersTableComponent,
  ],
})
export class SharedModule {}
