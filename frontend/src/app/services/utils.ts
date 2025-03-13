import { environment } from '../../environments/environment';

export const API_ENDPOINTS = {
    LOGIN: `${environment.API_URL}/users/login`,
    REGISTER: `${environment.API_URL}/users/register`,
    EVENTS: `${environment.API_URL}/events`,
    MYEVENTS: `${environment.API_URL}/users/me/events`,
    USERS: `${environment.API_URL}/admin/users`,
    CURRENT_USER: `${environment.API_URL}/current-user`
  };