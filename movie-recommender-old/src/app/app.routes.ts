import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'login' }
];