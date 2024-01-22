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
] as Routes
