import { RegisterComponent } from './auth/register/register.component'
import { Routes } from '@angular/router'

import { HomepageComponent } from './landing-page'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/homepage/homepage.component').then(
        (x) => x.HomepageComponent,
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (x) => x.RegisterComponent,
      ),
  },
]
