import { Component, ViewEncapsulation } from '@angular/core'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { CommonModule } from '@angular/common'
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
  activeTab: string = 'listing'

  currentTab(tab: any) {
    this.activeTab = tab?.id
  }
}
