import { BusinessBioComponent } from './manage-business/components/business-bio/business-bio.component'
import { ManageProfileComponent } from './manage-profile/manage-profile'
import { HomepageComponent } from './landing-page/homepage'
import { Routes } from '@angular/router'
import { LoginComponent, RegisterComponent } from './auth'
import { ConfirmPaymentComponent, PlanComponent } from './susbscription-plans'
import { AuthGuard } from './shared/utils/guard/auth.guard'
import { PageNotFoundComponent } from './common-ui'
import {
  BenefitsOfJoiningComponent,
  FindBusinessComponent,
  ListBusinessComponent,
  PreviewBusinessComponent,
  SubscriptionFormComponent,
} from './manage-business'
import { BusinessCategories } from './categories'
import { ConsultationFormComponent } from './manage-business/components/consultation-form/consultation-form.component'
import {
  EditProfileComponent,
  MyBusinessComponent,
} from './manage-profile/components'

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
    children: [
      {
        path: '',
        component: EditProfileComponent,
      },
      {
        path: 'my-business',
        component: MyBusinessComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'preview-business/:id',
    loadComponent: () => PreviewBusinessComponent,
  },
  {
    path: 'confirm-payment/:id',
    loadComponent: () => ConfirmPaymentComponent,
  },
  {
    path: 'subscription-plans',
    loadComponent: () => PlanComponent,
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
    path: 'benefits-of-joining',
    loadComponent: () => BenefitsOfJoiningComponent,
  },
  {
    path: 'business-categories',
    loadComponent: () => BusinessCategories,
  },
  {
    path: 'preview-business',
    loadComponent: () => PreviewBusinessComponent,
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent,
  },
] as Routes
