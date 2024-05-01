import { Component } from '@angular/core'
import { AnalyticsService } from '../../service/analytics.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-business-listing',
  standalone: true,
  imports: [AnalyticsTableComponent, CommonModule],
  templateUrl: './business-listing.component.html',
  styleUrl: './business-listing.component.scss',
})
export class BusinessListingComponent {
  dataa: any
  timePeriod = 'yearly'
  constructor(
    private analyticsService: AnalyticsService,
    private fullPageLoader: FullPageLoaderService,
  ) {}

  getAnalyticsData() {
    this.fullPageLoader.showLoader()
    this.analyticsService
      .GetBusinessListingAnalytics({
        posts_per_page: 5,
        page_no: this.currentPage,
        time_period: this.timePeriod,
      })
      .subscribe({
        next: (res) => {
          this.fullPageLoader.hideLoader()
          this.dataa = res?.data
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
    console.log(e)
    this.currentPage = e
    this.getAnalyticsData()
  }

  handleTimePeriodChange(e: any) {
    this.timePeriod = e
    this.getAnalyticsData()
  }

  columns = ['Post Title', 'Post Status']
  rowAccessor = ['post_title', 'post_status']

  ngOnInit(): void {
    this.getAnalyticsData()
  }
}
