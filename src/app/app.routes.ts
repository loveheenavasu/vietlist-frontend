import { HomepageComponent } from './landing-page/homepage'
import { Routes } from '@angular/router'

export default [
  {
    path: '',
    component: HomepageComponent,
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (x) => x.RegisterComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((x) => x.LoginComponent),
  },
] as Routes
