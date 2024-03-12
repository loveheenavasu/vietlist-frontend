
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
import { Roles } from './shared'
import { MyBookingsComponent } from './manage-profile/components/my-bookings/my-bookings.component'
import { MyTransactionsComponent } from './manage-profile/components/my-transactions/my-transactions.component'
import { AllBookingsComponent } from './manage-profile/components/all-bookings/all-bookings.component'
import { CancellationPolicyComponent } from './manage-profile/components/cancellation-policy/cancellation-policy.component'
// import { LoginGuard } from './shared/utils/guard/login.guard'

export default [
  {
    path: '',
    loadComponent: () => HomepageComponent,
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
        path: 'manage-bookings',
        loadComponent: () => MyBookingsComponent
      },
      {
        path:'cancellaton-policy',
        loadComponent:() => CancellationPolicyComponent
      },
      {
        path: '',
        loadComponent: () => EditProfileComponent,
      },
      {
        path: 'my-business',
        loadComponent: () => MyBusinessComponent,
      },
      {
        path: 'change-password',
        loadComponent: () => ChangePasswordComponent,
      },
      {
        path: 'delete-account',
        loadComponent: () => DeleteAccountComponent,
      },
      {
        path: 'setting',
        loadComponent: () => SettingComponent,
      },
      {
        path: 'privacy',
        loadComponent: () => PrivacyComponent,
      },
      {
        path: 'subscription',
        loadComponent: () => ManageSubscriptionComponent,
      },
      {
        path: 'manage-ads',
        loadComponent: () => AdsListComponent,
      },
      {
        path: 'create-ad',
        loadComponent: () => CreateAdsComponent,
      },
      {
        path: 'billing-address',
        loadComponent: () => BillingAddressComponent,
      },
      {
        path: 'manage-events',
        loadComponent: () => MyEventsComponent
      },
      {
        path: 'my-transactions',
        loadComponent: () => MyTransactionsComponent
      },
      {
        path:'all-bookings/:id',
        loadComponent: () => AllBookingsComponent
      }
    ],
    canActivate: [AuthGuard],
    data: { roles: ['business-owner', 'subscriber'] }
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
    path: 'confirm-payment/:price',
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
    path: 'find-business/:id',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'find-business-location',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'find-business',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'list-business',
    loadComponent: () => ListBusinessComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.businessOwner] }
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
    canActivate: [AuthGuard],
    data: { roles: ['business-owner'] }
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
    path: 'business-details/:id',
    loadComponent: () => EventDetailsComponent,
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent,
  },
] as Routes
