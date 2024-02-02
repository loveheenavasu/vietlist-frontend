import { ManageProfileComponent } from './manage-profile/manage-profile'
import { HomepageComponent } from './landing-page/homepage'
import { Routes } from '@angular/router'
import { LoginComponent, RegisterComponent } from './auth'
import { ConfirmPaymentComponent, PlanComponent } from './susbscription-plans'
import { AuthGuard } from './shared/utils/guard/auth.guard'
import { PageNotFoundComponent } from './common-ui'
import { FindBusinessComponent, ListBusinessComponent, ListingBusinessComponent } from './manage-business'

export default [
  {
    path: '',
    component: HomepageComponent,
  },

  {
    path: 'register',
    loadComponent: () => RegisterComponent,
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'manage-profile',
    loadComponent: () => ManageProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirm-payment/:id',
    loadComponent: () => ConfirmPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subscription-plans',
    loadComponent: () => PlanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'find-business',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'list-business',
    loadComponent: () => ListBusinessComponent,
  },
  {
    path: 'listing-business',
    loadComponent: () => ListingBusinessComponent
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent
  },
] as Routes
