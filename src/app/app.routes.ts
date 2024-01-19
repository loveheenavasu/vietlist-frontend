import { Routes } from '@angular/router'
import { HomepageComponent } from './landing-page'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/homepage/homepage.component').then(
        (x) => x.HomepageComponent,
      ),
    pathMatch: 'full',
  },
]
