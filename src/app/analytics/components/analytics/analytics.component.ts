import { Component, ViewEncapsulation } from '@angular/core'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AnalyticsService } from '../../service/analytics.service'
import { CommonModule } from '@angular/common'
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router'
import { AdsAnalyticsComponent } from '../ads-analytics/ads-analytics.component'
import { BookingAnalyticsComponent } from '../booking-analytics/booking-analytics.component'
import { BusinessListingComponent } from '../business-listing/business-listing.component'
import { EventsComponent } from '../events/events.component'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    TabsModule,
    CommonModule,
    AdsAnalyticsComponent,
    BookingAnalyticsComponent,
    BusinessListingComponent,
    EventsComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AnalyticsComponent {
  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService
      .GetEventAnalytics({
        posts_per_page: 2,
        page_no: 1,
        time_period: 'monthly',
      })
      .subscribe({ next: (data) => {}, error: (err) => {} })
  }
}
