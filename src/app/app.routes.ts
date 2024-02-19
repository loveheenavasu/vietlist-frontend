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
import { BusinessCategories, BusinessListingComponent } from './categories'
import { ConsultationFormComponent } from './manage-business/components/consultation-form/consultation-form.component'
import {
  ChangePasswordComponent,
  DeleteAccountComponent,
  EditProfileComponent,
  ManageSubscriptionComponent,
  MyBusinessComponent,
  PrivacyComponent,
  SettingComponent,
} from './manage-profile/components'
import { AddEventComponent } from './manage-event'
import { CreateAdsComponent } from './manage-profile/components/manage-ads/create-ads/create-ads.component'

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
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'delete-account',
        component: DeleteAccountComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
      },
      {
        path: 'subscription',
        component: ManageSubscriptionComponent,
      },
      {
        path: 'manage-ads',
        component:CreateAdsComponent,
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
    path: 'business-listing',
    loadComponent: () => BusinessListingComponent,
  },
  {
    path: 'preview-business',
    loadComponent: () => PreviewBusinessComponent,
  },
  {
    path: 'add-event',
    loadComponent: () => AddEventComponent,
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent,
  },
] as Routes
