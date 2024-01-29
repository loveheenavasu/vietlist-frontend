import { ManageProfileComponent } from './manage-profile/manage-profile'
import { HomepageComponent } from './landing-page/homepage'
import { Routes } from '@angular/router'
import { LoginComponent, RegisterComponent } from './auth'
import { ConfirmPaymentComponent } from './landing-page/views'

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
    path:'confirm-payment',
    loadComponent:()=> ConfirmPaymentComponent
  }
] as Routes
