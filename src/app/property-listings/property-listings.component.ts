import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

import { NgxPaginationModule } from 'ngx-pagination'
import { Subscription, Subject, takeUntil } from 'rxjs'
import { LoaderComponent } from '../common-ui'
import { BusinessService } from '../manage-business/service/business.service'
import { FullPageLoaderService } from '../shared/utils'
import { AutocompleteComponent } from '../shared/utils/googleaddress'
import { scrollToTop } from '../shared/utils/windowScrolls'
import { MatCardFooter } from '@angular/material/card'

@Component({
  selector: 'app-property-listings',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    AutocompleteComponent,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgbRatingModule,
    NgxPaginationModule,
    MatCardFooter,
  ],
  templateUrl: './property-listings.component.html',
  styleUrl: './property-listings.component.scss',
})
export class PropertyListingsComponent {
  public selectedLayout: string = 'grid'
  public propertiesArr: any[] = []
  public subscription!: Subscription
  public isLoader: boolean = false
  public post_category: any[] = []
  public category = new FormControl('')
  public totalCount: number = 0
  public postPerPage: number = 12
  public currentPage: number = 1
  private destroy$ = new Subject<void>()

  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getPropertiesData()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getPropertiesData() {
    this.fullPageLoaderService.showLoader()
    this.businessCategoriesService
      .getMlsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.fullPageLoaderService.hideLoader()
          this.propertiesArr = res.data
          this.totalCount = res.total_count
          scrollToTop()
        },
        error: (err) => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  public handlePageChange(event: number) {
    this.currentPage = event
    this.getPropertiesData()
  }

  public viewProperty(Id: any) {
    this.router.navigate(['/property', Id])
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
