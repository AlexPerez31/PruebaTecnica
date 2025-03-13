import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MyEventsComponent } from './pages/events/my-events/my-events.component';
import { AllEventsComponent } from './pages/events/all-events/all-events.component';
import { CreateEventComponent } from './pages/events/create-event/create-event.component';
import { CreateSessionComponent } from './pages/events/create-session/create-session.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { EventDetailComponent } from './pages/events/event-detail/event-detail.component';
import { EditEventComponent } from './pages/events/edit-event/edit-event.component';
import { EditSessionComponent } from './pages/events/edit-session/edit-session.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-events', component: MyEventsComponent, canActivate: [AuthGuard] },
  { path: 'all-events', component: AllEventsComponent, canActivate: [AuthGuard] },
  { path: 'events/:id', component: EventDetailComponent, canActivate: [AuthGuard] },
  { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard], data: { roles: ['organizer', 'admin'] }},
  { path: 'edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard], data: { roles: ['organizer', 'admin'] }},
  { path: 'event/:id/session', component: CreateSessionComponent, canActivate: [AuthGuard], data: { roles: ['organizer', 'admin'] }},
  { path: 'event/:id/session/:id_s', component: EditSessionComponent, canActivate: [AuthGuard], data: { roles: ['organizer', 'admin'] }},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

