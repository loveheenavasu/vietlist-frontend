import { AddRealEstateBusinessComponent } from './add-real-estate-business/add-real-estate-business.component'
import { ResourceDetailComponent } from './landing-page/views/resource-detail/resource-detail.component'
import { BusinessBlogDetailsComponent } from './blognews/business-blog-details/business-blog-details.component'

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
import { BusinessDetailsComponent } from './manage-business/components/business-details/business-details.component'
import { LoginGuard } from './shared/utils/guard/login.guard'
import { MyEventsComponent } from './manage-profile/components/my-events/my-events.component'
import { Roles } from './shared'
import { MyBookingsComponent } from './manage-profile/components/my-bookings/my-bookings.component'
import { MyTransactionsComponent } from './manage-profile/components/my-transactions/my-transactions.component'
import { AllBookingsComponent } from './manage-profile/components/all-bookings/all-bookings.component'
import { CancellationPolicyComponent } from './manage-profile/components/cancellation-policy/cancellation-policy.component'
import { BookingDetailComponent } from './manage-event/components/booking-detail/booking-detail.component'
import { ThankYouPageComponent } from './common-ui/thank-you-page/thank-you-page.component'
import { ContactUsComponent } from './landing-page/views/contact-us/contact-us.component'
import { BusinessCategories, BusinessListingComponent } from './categories'
import { UserblogComponent } from './blognews/userblog/userblog.component'
import { BusinessblogsComponent } from './blognews/businessblogs/businessblogs.component'
import { UserBlogDetailsComponent } from './blognews/user-blog-details/user-blog-details.component'
import { NotificationPageComponent } from './notification-page/notification-page.component'
import { ClaimListingComponent } from './claim-listing/claim-listing.component'
import { FaqComponent } from './landing-page/views/faq/faq.component'
import { ForBusinessComponent } from './landing-page/views/for-business/for-business.component'
import { ResourcesComponent } from './landing-page/views/resources/resources.component'
import { CouponListComponent } from './manage-profile/components/manage-coupons/coupon-list/coupon-list.component'
import { AnalyticsComponent } from './analytics'
import { EmailMarketingComponent } from './email-marketing/email-marketing.component'
import { CalculatorMainComponent } from './calculator-main/calculator-main.component'
import { ForUsersComponent } from './landing-page/views/for-users/for-users.component'
import { TermsComponent } from './landing-page/views/terms/terms.component'
import { LegalPolicyComponent } from './landing-page/views/legal-policy/legal-policy.component'
import { SitemapComponent } from './sitemap/sitemap.component'
import { LeadGenerationComponent } from './resell-system/lead-generation/lead-generation.component'
import { LeadListingComponent } from './resell-system/lead-listing/lead-listing.component'
import { MyLeadsComponent } from './resell-system/my-leads/my-leads.component'
import { LeadsTransactionHistoryComponent } from './resell-system/leads-transaction-history/leads-transaction-history.component'
import { ViewLeadComponent } from './resell-system/view-lead/view-lead.component'
import { SyncedListingComponent } from './manage-profile/components/mls/synced-listing/synced-listing.component'
import { ApiKeyComponent } from './manage-profile/components/mls/api-key/api-key.component'
import { PropertyDetailsComponent } from './property-details/property-details.component'
import { PropertyListingsComponent } from './property-listings/property-listings.component'
import { AgentDetailComponent } from './agent-detail/agent-detail.component'

// import { LoginGuard } from './shared/utils/guard/login.guard'

export default [
  {
    path: '',
    loadComponent: () => HomepageComponent,
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    loadComponent: () => RegisterComponent,
  },

  {
    path: 'manage-profile',
    loadComponent: () => ManageProfileComponent,
    children: [
      {
        path: 'manage-bookings',
        loadComponent: () => MyBookingsComponent,
      },
      {
        path: 'cancellaton-policy',
        loadComponent: () => CancellationPolicyComponent,
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
        loadComponent: () => MyEventsComponent,
      },
      {
        path: 'my-transactions',
        loadComponent: () => MyTransactionsComponent,
      },
      {
        path: 'all-bookings/:id',
        loadComponent: () => AllBookingsComponent,
      },
      {
        path: 'manage-coupons',
        loadComponent: () => CouponListComponent,
      },
      {
        path: 'my-purchased-leads',
        loadComponent: () => MyLeadsComponent,
      },
      {
        path: 'leads-transaction-history',
        loadComponent: () => LeadsTransactionHistoryComponent,
      },
      {
        path: 'all-synced-listing',
        loadComponent: () => SyncedListingComponent,
      },
      {
        path: 'synced-listings',
        loadComponent: () => ApiKeyComponent,
      },
    ],
    canActivate: [AuthGuard],
    data: { roles: ['business-owner', 'subscriber', 'broker', 'real-estate'] },
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
    path: 'booking-payment',
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
    path: 'find-business/:title/:id',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'find-business-location/:title/:id',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'find-business',
    loadComponent: () => FindBusinessComponent,
  },
  {
    path: 'properties',
    loadComponent: () => PropertyListingsComponent,
  },
  {
    path: 'list-business',
    loadComponent: () => ListBusinessComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.businessOwner] },
  },
  {
    path: 'edit-business/:id',
    loadComponent: () => ListBusinessComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.businessOwner] },
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
    path: 'user-blog',
    loadComponent: () => UserblogComponent,
  },
  {
    path: 'user-blog-details/:id',
    loadComponent: () => UserBlogDetailsComponent,
  },
  {
    path: 'property/:id',
    loadComponent: () => PropertyDetailsComponent,
  },
  {
    path: 'business-blog',
    loadComponent: () => BusinessblogsComponent,
  },
  {
    path: 'business-blog-details/:id',
    loadComponent: () => BusinessBlogDetailsComponent,
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
    data: { roles: ['business-owner'] },
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
    path: 'event-details/:slug',
    loadComponent: () => EventDetailsComponent,
  },
  {
    path: 'booking-details/:id',
    loadComponent: () => BookingDetailComponent,
  },
  {
    path: 'business-details/:id',
    loadComponent: () => BusinessDetailsComponent,
  },
  {
    path: 'contact-us',
    loadComponent: () => ContactUsComponent,
  },
  {
    path: 'thank-you',
    loadComponent: () => ThankYouPageComponent,
  },
  {
    path: 'notifications',
    loadComponent: () => NotificationPageComponent,
  },
  {
    path: 'claim-business/:id',
    loadComponent: () => ClaimListingComponent,
  },
  {
    path: 'faq',
    loadComponent: () => FaqComponent,
  },
  {
    path: 'for-users',
    loadComponent: () => ForUsersComponent,
  },
  {
    path: 'for-business',
    loadComponent: () => ForBusinessComponent,
  },
  {
    path: 'terms-conditions',
    loadComponent: () => TermsComponent,
  },
  {
    path: 'legal-policy',
    loadComponent: () => LegalPolicyComponent,
  },
  {
    path: 'resources',
    loadComponent: () => ResourcesComponent,
  },
  {
    path: 'resource-details/:id',
    loadComponent: () => ResourceDetailComponent,
  },
  {
    path: 'calculator',
    loadComponent: () => CalculatorMainComponent,
  },
  {
    path: 'analytics',
    loadComponent: () => AnalyticsComponent,
  },
  {
    path: 'email-marketing',
    loadComponent: () => EmailMarketingComponent,
  },
  {
    path: 'sitemap',
    loadComponent: () => SitemapComponent,
  },
  {
    path: 'loan-application',
    loadComponent: () => LeadGenerationComponent,
  },
  {
    path: 'lead-listing',
    loadComponent: () => LeadListingComponent,
  },
  {
    path: 'view-leads',
    loadComponent: () => ViewLeadComponent,
  },
  {
    path: 'complete-profile',
    loadComponent: () => AddRealEstateBusinessComponent,
  },
  {
    path: 'agent-details/:id',
    loadComponent: () => AgentDetailComponent,
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent,
  },
] as Routes
