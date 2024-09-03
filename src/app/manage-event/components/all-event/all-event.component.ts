import { FindEventParams } from './../../../manage-business/service/business.interface'
import { DatePipe, NgClass, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { NgxPaginationModule } from 'ngx-pagination'
import { Subscription } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { EventService } from '../../service/event.service'
import Swal from 'sweetalert2'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'
import { createSlug } from 'src/app/shared/helper'

@Component({
  selector: 'app-all-event',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    AutocompleteComponent,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    MatSelectModule,
    NgxPaginationModule,
    NgIf,
    TruncateHtmlPipe,
  ],
  templateUrl: './all-event.component.html',
  styleUrl: './all-event.component.scss',
})
export class AllEventComponent {
  public datePipe = new DatePipe('en-US')

  public selectedLayout: string = 'grid'
  public publishEventsArray: any[] = []
  public subscription!: Subscription
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public longitude: any
  public latitude: any
  public isLoader: boolean = false
  public event_category: any[] = []
  public category = new FormControl('')
  public postTitle = new FormControl('')
  public postPerPage: number = 6
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public totalPages: number = 0

  isSearching: boolean = false
  constructor(
    private eventService: EventService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.getPublishEventData()
    this.getEventCat()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  public getEventCat() {
    this.eventService.getEventCat().subscribe({
      next: (res: any) => {
        this.event_category = res.data
      },
      error: (err) => {},
    })
  }

  formatDate(time: string): string {
    // Manually append today's date before formatting
    if (time) {
      const today = new Date()
      const formattedTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${time}`
      return this.datePipe?.transform(formattedTime, 'shortTime') || ''
    } else {
      return '--'
    }
  }

  private getBrowserTimezone(): string {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.convertTimezoneIdentifier(browserTimezone)
  }

  private convertTimezoneIdentifier(timezone: string): string {
    switch (timezone) {
      case 'Asia/Calcutta':
        return 'Asia/Kolkata'
      default:
        return timezone
    }
  }

  // public getPublishEventData() {
  //   this.fullPageLoaderService.showLoader()
  //   // var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   var browserTimezone = this.getBrowserTimezone();
  //   const params: FindEventParams = {}
  //   const postPerPage = this.postPerPage
  //   if (postPerPage) {
  //     params['posts_per_page'] = postPerPage
  //   }
  //   if (this.currentPage) {
  //     params['page_no'] = this.currentPage
  //   }
  //   if (browserTimezone) {
  //     params['timezone'] = browserTimezone
  //   }
  //   this.eventService.getPublishEvents(params).subscribe({
  //     next: (res: any) => {
  //       this.fullPageLoaderService.hideLoader()
  //       this.publishEventsArray = res.data
  //       this.totalCount = res.total_count
  //       this.totalPages = Math.ceil(this.totalCount / this.postPerPage);
  //       console.log(res)
  //       console.log(this.publishEventsArray)
  //     },
  //   })
  // }

  public getAddress(place: any) {
    this.fullAddress = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
      element.types.filter((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
        }
      })
    })
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
  }

  // public searchBusiness() {
  //   this.currentPage = 1;
  //   if (!this.category.value && !this.fullAddress && !this.postTitle.value) {
  //     Swal.fire({
  //       toast: true,
  //       text: 'Please fill either category or address',
  //       animation: false,
  //       icon: 'error',
  //       position: 'top-right',
  //       showConfirmButton: false,
  //       timer: 10000,
  //       timerProgressBar: true,
  //     })
  //     return
  //   }
  //   this.fullPageLoaderService.showLoader()
  //   var browserTimezone = this.getBrowserTimezone();
  //   const post_category = this.category.value
  //   const postPerPage = this.postPerPage
  //   const params: FindEventParams = {}
  //   if (post_category) {
  //     params['post_category'] = post_category
  //   }
  //   if (this.postTitle.value) {
  //     params['post_title'] = this.postTitle.value
  //   }
  //   if (postPerPage) {
  //     params['posts_per_page'] = postPerPage
  //   }
  //   if (this.currentPage) {
  //     params['page_no'] = this.currentPage
  //   }
  //   if (this.city) {
  //     params['city'] = this.city
  //   }
  //   if (this.state) {
  //     params['region'] = this.state
  //   }
  //   if (this.fullAddress) {
  //     params['street'] = this.fullAddress
  //   }
  //   if (this.zipcode) {
  //     params['zip'] = this.zipcode
  //   }
  //   if (this.country) {
  //     params['country'] = this.country
  //   }
  //   if (browserTimezone) {
  //     params['timezone'] = browserTimezone
  //   }

  //   this.eventService.findEvents(params).subscribe({
  //     next: (res: any) => {
  //       this.isLoader = false
  //       this.isPaginationClick = false
  //       this.isPaginationVisible = true
  //       this.fullPageLoaderService.hideLoader()
  //       this.publishEventsArray = res.data
  //       this.totalCount = res.total_count
  //       this.totalPages = Math.ceil(this.totalCount / this.postPerPage);

  //       console.log(res)
  //     },
  //     error: (err: any) => {
  //       this.isLoader = false
  //     },
  //   })
  // }

  public gotToEventDetails(item: any, isGlobal: boolean) {
    let slug = item?.slug
      ? item.slug
      : createSlug(item?.post_id, item?.post_title)
    this.router.navigate(['/event-details', slug], {
      state: { id: item?.post_id, isGlobal },
    })
  }

  // public handlePageChange(event: number): void {
  //   this.isPaginationClick = true
  //   this.currentPage = event

  //   if (this.category.value) {
  //     this.searchBusiness()
  //   } else {
  //     this.getPublishEventData()
  //   }
  // }

  public clearFilters(): void {
    // Clear local variables
    this.authenticationService.clearLocationValue.next(true)
    this.fullAddress = ''
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    this.latitude = ''
    this.longitude = ''
    this.street = ''
    // Reset category FormControl
    this.category.setValue(null)
    this.postTitle.setValue(null)
    // Reset pagination and loader
    this.currentPage = 1
    this.isPaginationVisible = false
    this.isLoader = true

    // Retrieve events again
    this.getPublishEventData()
  }

  getPublishEventData(): void {
    this.isSearching = false // Reset search flag
    this.fullPageLoaderService.showLoader()
    const params: FindEventParams = {
      posts_per_page: this.postPerPage,
      page_no: this.currentPage,
      timezone: this.getBrowserTimezone(),
    }

    this.eventService.getPublishEvents(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.publishEventsArray = res.data
        this.totalCount = res.total_count
        console.log(res, 'events')
        this.calculateTotalPages()
      },
      error: (err: any) => {
        // Handle error
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  searchBusiness(): void {
    this.isSearching = true // Set search flag
    this.fullPageLoaderService.showLoader()
    const post_category = this.category.value
    const postPerPage = this.postPerPage
    var browserTimezone = this.getBrowserTimezone()
    const params: FindEventParams = {}
    if (post_category) {
      params['post_category'] = post_category
    }
    if (this.postTitle.value) {
      params['post_title'] = this.postTitle.value
    }
    if (postPerPage) {
      params['posts_per_page'] = postPerPage
    }
    if (this.currentPage) {
      params['page_no'] = this.currentPage
    }
    if (this.city) {
      params['city'] = this.city
    }
    if (this.state) {
      params['region'] = this.state
    }
    if (this.fullAddress) {
      params['street'] = this.fullAddress
    }
    if (this.zipcode) {
      params['zip'] = this.zipcode
    }
    if (this.country) {
      params['country'] = this.country
    }
    if (browserTimezone) {
      params['timezone'] = browserTimezone
    }

    this.eventService.findEvents(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.publishEventsArray = res.data
        this.totalCount = res.total_count
        this.calculateTotalPages()
      },
      error: (err: any) => {
        // Handle error
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalCount / this.postPerPage)
  }

  handlePageChange(event: number): void {
    this.currentPage = event

    if (this.isSearching) {
      this.searchBusiness()
    } else {
      this.getPublishEventData()
    }
  }
}
