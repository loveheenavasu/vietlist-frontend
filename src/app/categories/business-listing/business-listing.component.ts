import { MatSelectModule } from '@angular/material/select'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service'
import { BusinessService } from '../../manage-business/service/business.service'
import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Subscription } from 'rxjs'
import { FindBusinessParams, FindEventParams } from 'src/app/manage-business/service/business.interface'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxPaginationModule } from 'ngx-pagination'
import { scrollToTop } from 'src/app/shared/utils/windowScrolls'
import { AuthenticationService } from '@vietlist/shared'
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
  ],
  templateUrl: './business-listing.component.html',
  styleUrl: './business-listing.component.scss',
})
export class BusinessListingComponent {
  public selectedLayout: string = 'grid'
  public businessCategoriesArray: any[] = []
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
  public post_category: any[] = []
  public category = new FormControl('')
  public totalCount: number = 0
  public postPerPage: number = 12
  public currentPage: number = 1
  public isSearchingActive: boolean = false
  public isGlobal: any

  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this._activatedRoute.queryParams.subscribe((res) => {
      this.isGlobal = res['isGlobal']
      console.log("check global", this.isGlobal)
    })
  }

  ngOnInit() {
    if (this.isGlobal) {
      this.getVerfiedBusiness()
    } else {
      this.getPublishBusinessData()
    }
    this.getBusinessCat()
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
    this.businessCategoriesService.ListingBusiness(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        scrollToTop()
        this.businessCategoriesArray = res.data
        this.totalCount = res.total_count
      },
      error: (err) => {
        console.error('API error:', err);
        this.fullPageLoaderService.hideLoader()
      }
    })
  }

  public getVerfiedBusiness() {
    this.fullPageLoaderService.showLoader()
    this.isSearchingActive = false
    const params: FindEventParams = {
      posts_per_page: this.postPerPage,
      page_no: this.currentPage,
      verified_data: '1'
    }
    this.businessCategoriesService.ListingBusiness(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.businessCategoriesArray = res.data
        this.totalCount = res.total_count
      },
    })
  }

  public getBusinessCat() {
    this.businessCategoriesService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
        console.log(this.post_category)
      },
      error: (err) => { },
    })
  }

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

  public search() {
    this.isLoader = true
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
    if (this.category.value) {
      params['post_category'] = this.category.value
    }
    if (postPerPage) {
      params['posts_per_page'] = postPerPage
    }
    if (this.currentPage) {
      params['page_no'] = this.currentPage
    }

    this.businessCategoriesService.findBusiness(params).subscribe({
      next: (res) => {
        this.isLoader = false

        this.businessCategoriesArray = res.data
        this.totalCount = res.total_count;
      },
      error: (error) => { },
    })
  }

  public gotToListing(id: any, isGlobal: any) {
    this.router.navigate(['/business-details', id], { queryParams: { isGlobal: isGlobal } });

  }

  public handlePageChange(event: number) {
    this.currentPage = event
    console.log("check the pagination", this.isSearchingActive)
    if (this.isSearchingActive) {
      this.search()
    } else {
      this.getPublishBusinessData()
    }
  }

  public clearFilters(): void {
    // Clear local variables
    this.authenticationService.clearLocationValue.next(true)
    this.fullAddress = '';
    this.state = '';
    this.country = '';
    this.city = '';
    this.zipcode = '';
    this.latitude = '';
    this.longitude = '';
    this.street = ''
    // Reset category FormControl
    this.category.setValue(null);
    // Reset pagination and loader
    this.currentPage = 1;
    // this.isPaginationVisible = false;
    // Retrieve events again
    this.getPublishBusinessData();
  }

}
