import { ManageProfileComponent } from './manage-profile/manage-profile'
import { HomepageComponent } from './landing-page/homepage'
import { Routes } from '@angular/router'
import { LoginComponent, RegisterComponent } from './auth'
import { ConfirmPaymentComponent } from './landing-page/views'
import { PlanComponent } from './susbscription-plans'

export default [
  {
    path: '',
    component: HomepageComponent,
  },

  {
    path: 'register',
    loadComponent: () => RegisterComponent
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent
  },
  {
    path: 'manage-profile',
    loadComponent: () => ManageProfileComponent,
  },
  {
    path:'confirm-payment/:id',
    loadComponent:()=> ConfirmPaymentComponent
  },
  {
    path:'choose-plan',
    loadComponent:()=>PlanComponent
  }
] as Routes
