import { Component, OnInit } from '@angular/core'
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component'
import { AnalyticsService } from '../../service/analytics.service'
import { CommonModule } from '@angular/common'
import { FullPageLoaderService } from '@vietlist/shared'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AnalyticsTableComponent, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  dataa: any
  timePeriod = 'yearly'
  constructor(
    private analyticsService: AnalyticsService,
    private fullPageLoader: FullPageLoaderService,
  ) {}

  getAnalyticsData() {
    this.fullPageLoader.showLoader()
    this.analyticsService
      .GetEventAnalytics({
        posts_per_page: 5,
        page_no: this.currentPage,
        time_period: this.timePeriod,
      })
      .subscribe({
        next: (res) => {
          this.fullPageLoader.hideLoader()
          this.dataa = res?.data || []
          this.totalItems = res?.total_count || 0
        },
        error: (err) => {
          this.fullPageLoader.hideLoader()
        },
      })
  }
  currentPage = 1
  totalItems = 4
  itemsPerPage = 2
  handlePageChange(e: any) {
    console.log(e)
    this.currentPage = e
    this.getAnalyticsData()
  }

  handleTimePeriodChange(e: any) {
    this.timePeriod = e
    this.getAnalyticsData()
  }

  columns = ['Post ID', 'Title', 'Status', 'Expiry Date', 'Event Bookings']
  rowAccessor = [
    'post_id',
    'post_title',
    'post_status',
    'event_expiry_date',
    'event_booking_count',
  ]

  ngOnInit(): void {
    this.getAnalyticsData()
  }
}
