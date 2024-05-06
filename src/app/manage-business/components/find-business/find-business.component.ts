import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { ChangeDetectorRef, Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { BusinessService } from '../../service/business.service'
import { FullPageLoaderService } from '@vietlist/shared'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  BusinessCategoryResponse,
  FindBusinessParams,
  FindEventParams,
} from '../../service/business.interface'
import { LoaderComponent } from 'src/app/common-ui'
import { NgxPaginationModule } from 'ngx-pagination'
import { MatSliderModule } from '@angular/material/slider'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { interval, take, repeat, Subscription, firstValueFrom } from 'rxjs'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-find-business',
  standalone: true,
  imports: [
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    NgxPaginationModule,
    MatSliderModule,
    FormsModule,
    AutocompleteComponent,
    NgbRatingModule,
  ],
  templateUrl: './find-business.component.html',
  styleUrl: './find-business.component.scss',
})
export class FindBusinessComponent {
  public selectedLayout: string = 'list'
  public categoriesValue: any
  public selectedDefaultCategories: any[] = []
  public findBusinessForm!: FormGroup
  public businessCat: BusinessCategoryResponse[] = []
  public findBusinessData: any[] = []
  public loader: boolean = false
  public postPerPage: number = 2
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public price: number = 0
  public slidervalue: number = 0
  public slideValueStart: number = 0
  public maxPrice: number = 0
  public minPrice: number = 0
  public latitude: any = []
  public longitude: any = []
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public searchPageAd: any
  public currentIndex: number = 0
  public ipAddress: any
  public multipleSpaceId: string[] = []
  public multipleAdId: string[] = []
  public categoryName: any
  public intervalSubscription?: Subscription
  public routeAddress: any
  public routeCategory: any
  public categoryDetails: any
  public map: google.maps.Map | null = null
  public ratingMax: string = '5'

  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private fb: FormBuilder,
    private searchAd: HomepageService,
    private IpService: ProfileService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.findBusinessForm = this.fb.group({
      post_category: [''],
      hours: [''],
      address: [''],
      model: [''],
      price: [''],
      slidervalue: [''],
    })

    this.route.queryParams.subscribe((params) => {
      this.country = params['country']
      this.street = params['state']
      this.city = params['city']
      this.street = params['street']
      this.zipcode = params['zip']
      this.street = this.street

      // Now you can use these parameters as needed
      // console.log('Country:', country);
      // console.log('State:', state);
      // console.log('City:', city);
      // console.log('Street:', street);
      // console.log('Zip:', zip);

      // You can also use these parameters to perform any actions or logic in your component
      // For example, you can call a method to fetch data based on these parameters
      this.searchBusiness()
    })
  }

  ngOnInit() {
    this.getPublishBusinessData()
    // this.getIPAdress()
    this.getIPAddress()
    // this.initMap()

    if (
      this.country ||
      this.state ||
      this.city ||
      this.street ||
      this.zipcode
    ) {
      this.searchBusiness()
    }

    this.getBusinessCat()

    // this.searchBusiness()
    this.findBusinessForm.controls['slidervalue'].setValue(0)
    // this.fetchSearchAd()
  }

  public fetchSearchAd() {
    this.searchAd.showAD().subscribe({
      next: (res: any) => {
        res.data.forEach((data: any) => {
          if (data.Page_key == 'Search') {
            this.searchPageAd = data.ads_detail
            this.searchPageAd.forEach((ad: any) => {
              this.multipleSpaceId.push(ad.space_id)
              this.multipleAdId.push(ad.id)
            })
            this.setStats()
            // console.log("check search ad", this.searchPageAd)
            if (this.searchPageAd && this.searchPageAd.length > 0) {
              this.intervalSubscription = interval(6000)
                .pipe(take(this.searchPageAd.length), repeat())
                .subscribe(() => {
                  if (this.currentIndex === this.searchPageAd.length - 1) {
                    this.currentIndex = 0
                  } else {
                    this.currentIndex++
                  }
                })
            }
          }
        })
      },
    })
  }

  public async getIPAddress(): Promise<string> {
    try {
      const res: any = await firstValueFrom(this.IpService.getIPAddress())
      console.log('RESPONSEEE', res.ip)
      this.ipAddress = res.ip
      this.fetchSearchAd()
      return res.ip
    } catch (error) {
      throw new Error('Error fetching IP address: ' + error)
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = this.padZero(date.getMonth() + 1)
    const day = this.padZero(date.getDate())
    const hours = this.padZero(date.getHours())
    const minutes = this.padZero(date.getMinutes())
    const seconds = this.padZero(date.getSeconds())
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }

  public myBrowser() {
    if (
      (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) != -1
    ) {
      return 'Opera'
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      return 'Chrome'
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
      return 'Safari'
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
      return 'Firefox'
    } else if (
      navigator.userAgent.indexOf('MSIE') != -1 ||
      !!(document as any).documentMode == true
    ) {
      return 'IE'
    } else {
      return 'unknown'
    }
  }

  public setStats(ad_id?: string, space_id?: string) {
    const currentDate = new Date()
    const actionTime = this.formatDate(currentDate)
    const currentRoute = window.location.href

    const body = {
      space_id: space_id ? space_id : this.multipleSpaceId,
      ad_id: ad_id ? ad_id : this.multipleAdId,
      action_type: space_id && ad_id ? 'click' : 'view',
      action_time: actionTime,
      user_ip: this.ipAddress,
      browser: this.myBrowser(),
      page_url: currentRoute,
    }
    this.searchAd.setStats(body).subscribe({
      next: (res: any) => {
        // console.log("check stats res", res)
      },
    })
  }

  public CountClickStats(ad_id: string, space_id: string) {
    this.setStats(ad_id, space_id)
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getPublishBusinessData() {
    this.fullPageLoaderService.showLoader()
    const params: FindEventParams = {
      posts_per_page: 4,
      page_no: this.currentPage,
    }

    this.businessCategoriesService.ListingBusiness(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        console.log('check res', res.data)
        this.findBusinessData = res.data
        this.categoryDetails = res.category_data
        this.maxPrice = res.max_price
        this.totalCount = res.total_count
        this.latitude = []
        this.longitude = []
        this.findBusinessData.forEach((obj) => {
          if (obj.latitude && obj.longitude) {
            this.latitude.push(obj.latitude)
            this.longitude.push(obj.longitude)
          }
        })
        console.log('check lat', this.latitude, this.longitude)
        this.initMap()
      },
    })
  }

  public getBusinessCat() {
    this.businessCategoriesService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
        console.log(this.businessCat, 'businessCat')
        if (res && this.route.snapshot.paramMap.has('id')) {
          const categoryId = Number(this.route.snapshot.paramMap.get('id'))
          this.findBusinessForm.get('post_category')?.setValue(categoryId)
          this.searchBusiness()
        }
      },
    })
  }

  public onCategoryChange() {
    this.categoriesValue = this.findBusinessForm.value.post_category
    this.searchBusiness()
    this.getDefaultCat()
  }

  public getDefaultCat() {
    this.businessCategoriesService
      .getDefaultCat(this.categoriesValue)
      .subscribe({
        next: (res: any) => {
          this.selectedDefaultCategories = res.data
        },
      })
  }

  public searchBusiness(callFrom?: any) {
    this.loader = true

    this.fullPageLoaderService.showLoader()
    const post_category = this.findBusinessForm.value.post_category
    const price = this.slidervalue
    const postPerPage = 2
    const params: FindBusinessParams = {}
    if (post_category) {
      params['post_category'] = post_category
    }
    if (price) {
      params['price'] = price
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

    this.businessCategoriesService.findBusiness(params).subscribe({
      next: (res: any) => {
        this.loader = false
        this.isPaginationClick = false
        this.isPaginationVisible = true
        this.fullPageLoaderService.hideLoader()
        this.findBusinessData = res.data
        this.categoryDetails = res.category_data
        this.latitude = []
        this.longitude = []
        this.findBusinessData.forEach((obj) => {
          if (obj.latitude && obj.longitude) {
            this.latitude.push(obj.latitude)
            this.longitude.push(obj.longitude)
            console.log('check lat', this.latitude, this.longitude)
          }
        })
        this.initMap()
        this.totalCount = res.total_count
        this.maxPrice = res.max_price
        if (callFrom !== 'pagination') {
          this.currentPage = 1
        }
      },
      error: (err: any) => {
        this.loader = false
      },
    })
  }

  public handlePageChange(event: number): void {
    this.isPaginationClick = true
    this.currentPage = event

    if (this.findBusinessForm.value.post_category) {
      this.searchBusiness('pagination')
    } else {
      this.getPublishBusinessData()
    }
  }

  public updatePrice(event: any) {
    this.price = event.value
    this.slidervalue = this.slidervalue
  }

  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      for (let i = 0; i < this.latitude.length; i++) {
        this.map = new google.maps.Map(mapElement, {
          center: {
            lat: parseFloat(this.latitude[i]),
            lng: parseFloat(this.longitude[i]),
          },
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        })
      }

      // Loop through latitude and longitude arrays to create markers
      for (let i = 0; i < this.latitude.length; i++) {
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(this.latitude[i]),
            lng: parseFloat(this.longitude[i]),
          },
          map: this.map || undefined,
          title: 'Marker Title',
        })
      }
    } else {
      console.error('Map element not found.')
    }
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
  public getUrl(url: string) {
    window.open(url, '_blank')
  }

  public gotToListing(id: any, isGlobal: any) {
    this.router.navigate(['/business-details', id], {
      queryParams: { isGlobal: isGlobal },
    })
  }

  ngOnDestroy() {
    // Unsubscribe from the interval subscription if it exists
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe()
    }
  }
}
