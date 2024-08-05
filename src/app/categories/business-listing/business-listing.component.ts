import { MatSelectModule } from '@angular/material/select'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service'
import { BusinessService } from '../../manage-business/service/business.service'
import { CommonModule, NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Subject, Subscription, takeUntil } from 'rxjs'
import {
  FindBusinessParams,
  FindEventParams,
} from 'src/app/manage-business/service/business.interface'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxPaginationModule } from 'ngx-pagination'
import { scrollToTop } from 'src/app/shared/utils/windowScrolls'
import { AuthenticationService } from '@vietlist/shared'
import { createSlug } from 'src/app/shared/helper'
import { SkeletonLoadingComponent } from 'src/app/common-ui/skeleton-loading/skeleton-loading.component'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'

@Component({
  selector: 'app-business-listing',
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
    CommonModule,
    SkeletonLoadingComponent,
    TruncateHtmlPipe,
  ],

  templateUrl: './business-listing.component.html',
  styleUrl: './business-listing.component.scss',
})
export class BusinessListingComponent {
  public selectedLayout: string = 'grid'
  public businessCategoriesArray: any[] | any = []
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
  public isSkeltonLoader: boolean = false
  // public post_title: any[] = []
  public totalCount: number = 0
  public postPerPage: number = 12
  public currentPage: number = 1
  public isSearchingActive: boolean = false
  public isGlobal: any
  private destroy$ = new Subject<void>()
  public findBusinessForm!: FormGroup

  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
  ) {
    this._activatedRoute.queryParams.subscribe((res) => {
      this.isGlobal = res['isGlobal']
    })
    this.findBusinessForm = this.fb.group({
      post_title: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.isGlobal) {
      this.getVerfiedBusiness()
    } else {
      this.getPublishBusinessData()
    }
    // this.getBusinessCat()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getPublishBusinessData() {
    this.fullPageLoaderService.showLoader()
    this.isSearchingActive = false
    const params: FindEventParams = {
      posts_per_page: this.postPerPage,
      page_no: this.currentPage,
    }
    this.businessCategoriesService
      .ListingBusiness(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.fullPageLoaderService.hideLoader()
          this.businessCategoriesArray = res.data
          this.totalCount = res.total_count
          scrollToTop()
        },
        error: (err) => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  public getVerfiedBusiness() {
    this.fullPageLoaderService.showLoader()
    this.isSearchingActive = false
    const params: FindEventParams = {
      posts_per_page: this.postPerPage,
      page_no: this.currentPage,
      verified_data: '1',
    }
    this.businessCategoriesService.ListingBusiness(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.businessCategoriesArray = res.data
        this.totalCount = res.total_count
      },
    })
  }

  // public getBusinessCat() {
  //   this.businessCategoriesService.getBusinessCat().subscribe({
  //     next: (res: any) => {
  //       this.post_category = res.data
  //     },
  //     error: (err) => {},
  //   })
  // }
  // debounce = (fn: any, delay = 1000) => {
  //   let timerId: any = null
  //   return (...args: any) => {
  //     clearTimeout(timerId)
  //     timerId = setTimeout(() => fn(...args), delay)
  //   }
  // }
  // private debouncedSearchBusiness = this.debounce(() => this.search(), 700)

  // onChange() {
  //   console.log('helllllllll')
  //   this.debouncedSearchBusiness()
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

  public search(callFrom?: string) {
    // if (!this.fullAddress) {
    //   return
    // }
    const post_title = this.findBusinessForm.value.post_title
    if (callFrom == 'btn') {
      this.isLoader = true
    }
    this.isSkeltonLoader = true
    this.isSearchingActive = true
    const postPerPage = this.postPerPage
    const params: FindBusinessParams = {}
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
    if (post_title) {
      params['post_title'] = post_title
    }
    // if (this.category.value) {
    //   params['post_category'] = this.category.value
    // }
    if (postPerPage) {
      params['posts_per_page'] = postPerPage
    }
    if (this.currentPage) {
      params['page_no'] = this.currentPage
    }
    // let iterableParams = Object.entries(params)
    // console.log(iterableParams, 'kkkkkkk')
    // if (!iterableParams.length) {
    //   return
    // }
    // for (let [_, value] of iterableParams) {
    //   if (!value) {
    //     return
    //   }
    // }

    this.businessCategoriesService.findBusiness(params).subscribe({
      next: (res) => {
        if (callFrom == 'btn') {
          this.isLoader = false
        }
        this.isSkeltonLoader = false

        this.businessCategoriesArray = res.data
        this.totalCount = res.total_count
      },
      error: (error) => {
        if (callFrom == 'btn') {
          this.isLoader = false
        }
        this.isSkeltonLoader = false
      },
    })
  }

  public gotToListing(item: any, isGlobal: any) {
    let slug = item?.slug
      ? item.slug
      : createSlug(item?.post_id, item?.post_title)
    this.router.navigate(['/business-details', slug], {
      state: { isGlobal, id: item?.post_id },
    })
  }

  public handlePageChange(event: number) {
    this.currentPage = event
    if (this.isSearchingActive) {
      this.search()
    } else {
      this.getPublishBusinessData()
    }
  }

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
    this.findBusinessForm.controls['post_title'].setValue(null)

    // Reset pagination and loader
    this.currentPage = 1
    // this.isPaginationVisible = false;
    // Retrieve events again
    this.getPublishBusinessData()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
