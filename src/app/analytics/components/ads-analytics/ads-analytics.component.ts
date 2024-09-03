import { Component } from '@angular/core'
import { AnalyticsService } from '../../service/analytics.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component'
import { CommonModule } from '@angular/common'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ads-analytics',
  standalone: true,
  imports: [AnalyticsTableComponent, CommonModule],
  templateUrl: './ads-analytics.component.html',
  styleUrl: './ads-analytics.component.scss',
})
export class AdsAnalyticsComponent {
  dataa: any
  timePeriod = 'yearly'
  constructor(
    private analyticsService: AnalyticsService,
    private fullPageLoader: FullPageLoaderService,
  ) {}

  getAnalyticsData() {
    this.fullPageLoader.showLoader()
    this.analyticsService
      .GetAdsAnalytics({
        time_period: this.timePeriod,
      })
      .subscribe({
        next: (res) => {
          console.log('object')
          this.fullPageLoader.hideLoader()
          this.dataa = res?.data
          this.totalItems = res?.total_count
        },
        error: (err) => {
          this.fullPageLoader.hideLoader()
          Swal.fire({
            toast: true,
            text: 'No Data Found For ads',
            animation: false,
            icon: 'error',
            position: 'top-right',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
          })
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

  columns = ['Title', 'Total Click', 'Total View']
  rowAccessor = ['title', 'total_click', 'total_view']

  ngOnInit(): void {
    this.getAnalyticsData()
  }
}
