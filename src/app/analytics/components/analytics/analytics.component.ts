import { Component, ViewEncapsulation } from '@angular/core'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AnalyticsService } from '../../service/analytics.service'
import { CommonModule } from '@angular/common'
import { AdsAnalyticsComponent } from '../ads-analytics/ads-analytics.component'
import { BookingAnalyticsComponent } from '../booking-analytics/booking-analytics.component'
import { BusinessListingComponent } from '../business-listing/business-listing.component'
import { EventsComponent } from '../events/events.component'
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component'

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
        posts_per_page: 5,
        page_no: 1,
        time_period: 'yearly',
      })
      .subscribe({ next: (data) => {}, error: (err) => {} })
  }
  // currentPage = 1
  // totalItems = 4
  // itemsPerPage = 2
}
