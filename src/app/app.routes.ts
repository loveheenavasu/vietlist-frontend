import { ManageProfileComponent } from './manage-profile/manage-profile'
import { HomepageComponent } from './landing-page/homepage'
import { Routes } from '@angular/router'
import { LoginComponent, RegisterComponent } from './auth'
import { ConfirmPaymentComponent, PlanComponent } from './susbscription-plans'

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
    path:'subscription-plans',
    loadComponent:()=>PlanComponent
  }
] as Routes
