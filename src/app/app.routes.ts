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
} from './manage-business'
import { BusinessCategories, BusinessListingComponent } from './categories'
import {
  BillingAddressComponent,
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
import { AdsListComponent } from './manage-profile/components/manage-ads/ads-list/ads-list.component'
import { AllEventComponent } from './manage-event/components/all-event/all-event.component'
import { EventDetailsComponent } from './manage-event/components/event-details/event-details.component'
import { LoginGuard } from './shared/utils/guard/login.guard'
import { MyEventsComponent } from './manage-profile/components/my-events/my-events.component'
// import { LoginGuard } from './shared/utils/guard/login.guard'

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
    canActivate: [LoginGuard]
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
        component:AdsListComponent,
      },
      {
        path: 'create-ad',
        component:CreateAdsComponent,
      },
      {
        path: 'billing-address',
        component:BillingAddressComponent,
      },
      {
        path:'manage-events',
        component:MyEventsComponent
      }
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
    canActivate: [AuthGuard] 
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
    path: 'edit-event/:id',
    loadComponent: () => AddEventComponent,
  },
  {
    path: 'events',
    loadComponent: () => AllEventComponent,
  },
  {
    path: 'event-details/:id',
    loadComponent: () => EventDetailsComponent,
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent,
  },
] as Routes
