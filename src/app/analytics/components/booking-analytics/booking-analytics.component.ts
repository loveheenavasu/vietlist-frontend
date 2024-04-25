import { Component } from '@angular/core'
import { AnalyticsService } from '../../service/analytics.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-booking-analytics',
  standalone: true,
  imports: [AnalyticsTableComponent, CommonModule],
  templateUrl: './booking-analytics.component.html',
  styleUrl: './booking-analytics.component.scss',
})
export class BookingAnalyticsComponent {
  dataa: any
  timePeriod = 'yearly'
  constructor(
    private analyticsService: AnalyticsService,
    private fullPageLoader: FullPageLoaderService,
  ) {}

  getAnalyticsData() {
    this.fullPageLoader.showLoader()
    this.analyticsService
      .GetBookingAnalytics({
        time_period: this.timePeriod,
      })
      .subscribe({
        next: (res) => {
          this.fullPageLoader.hideLoader()
          this.dataa = [res?.data]
          this.totalItems = res?.total_count
        },
        error: (err) => {
          this.fullPageLoader.hideLoader()
        },
      })
  }
  currentPage = 1
  totalItems = 4
  itemsPerPage = 5
  handlePageChange(e: any) {
    this.currentPage = e
    this.getAnalyticsData()
  }

  handleTimePeriodChange(e: any) {
    this.timePeriod = e
    this.getAnalyticsData()
  }

  columns = ['Total Earning', 'Total Booking']
  rowAccessor = ['total_earning', 'total_booking']

  ngOnInit(): void {
    this.getAnalyticsData()
  }
}
