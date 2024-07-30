import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { ChangeDetectorRef, Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule, JsonPipe } from '@angular/common'
import { BusinessService } from '../../service/business.service'
import { FullPageLoaderService, LocalStorageService } from '@vietlist/shared'
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
import { createSlug, debounce } from 'src/app/shared/helper'
import { SkeletonLoadingComponent } from 'src/app/common-ui/skeleton-loading/skeleton-loading.component'
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
    JsonPipe,
    SkeletonLoadingComponent,
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
  public isSkeltonLoader: boolean = false
  public postPerPage: number = 3
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
  bannerBlog: any
  userBlogs: any
  post_title: any
  category_id: any
  valuesForLocalStorageKey = [
    'city',
    'state',
    'zipcode',
    'country',
    'fullAddress',
    'price',
    'slidervalue',
    'street',
  ]
  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private fb: FormBuilder,
    private searchAd: HomepageService,
    private IpService: ProfileService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
    this.findBusinessForm = this.fb.group({
      post_title: [''],
      post_category: [''],
      hours: [''],
      address: [''],
      model: [''],
      price: ['23'],
      slidervalue: ['100'],
    })

    const navigation = this.router.getCurrentNavigation()
    console.log(navigation?.extras?.state, 'navigation?.extras?.state')
    this.category_id = navigation?.extras?.state?.['id']
    this.post_title = navigation?.extras?.state?.['title']
    this.country = navigation?.extras?.state?.['country']
    this.state = navigation?.extras?.state?.['state']
    this.city = navigation?.extras?.state?.['city']
    this.street = navigation?.extras?.state?.['street']
    this.zipcode = navigation?.extras?.state?.['zip']

    // this.route.queryParams.subscribe((params) => {
    //   this.street = this.street
    // })
  }

  public getBusinessCat() {
    this.businessCategoriesService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
        if (res && this.category_id) {
          const categoryId = Number(this.category_id)
          this.findBusinessForm.get('post_category')?.setValue(categoryId)
          this.searchBusiness()
        }
      },
    })
  }

  getUserBlogs() {
    this.searchAd.userBlogs(5, 1, 'home').subscribe({
      next: (result) => {
        this.bannerBlog = result?.data.shift()
        this.userBlogs = result?.data
      },
      error: (err) => {},
    })
  }
  public viewuserdetails(blog_id: any) {
    this.router.navigate(['/user-blog-details/', blog_id])
    // this.authService.BlogID.next(details?.blog_id)
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
    // this.fullPageLoaderService.showLoader()
    const params: FindEventParams = {
      posts_per_page: this.postPerPage,
      page_no: this.currentPage,
    }

    this.businessCategoriesService.ListingBusiness(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
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
        this.cdr.detectChanges()
        this.initMap()
      },
      error: () => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  // debounce = (fn: any, delay = 1000) => {
  //   let timerId: any = null
  //   return (...args: any) => {
  //     clearTimeout(timerId)
  //     timerId = setTimeout(() => fn(...args), delay)
  //   }
  // }
  // private debouncedSearchBusiness = this.debounce(
  //   () => this.searchBusiness(),
  //   700,
  // )

  public getDefaultCat() {
    this.businessCategoriesService
      .getDefaultCat(this.categoriesValue)
      .subscribe({
        next: (res: any) => {
          this.selectedDefaultCategories = res.data
        },
      })
  }

  // onChange(e: any) {
  //   this.debouncedSearchBusiness()
  // }

  public searchBusiness(callFrom?: any) {
    if (callFrom == 'btn') {
      this.loader = true
    }
    this.isSkeltonLoader = true
    const post_title = this.findBusinessForm.value.post_title
    const post_category = this.findBusinessForm.value.post_category
    const price = this.slidervalue
    const params: FindBusinessParams = {}
    if (post_title) {
      params['post_title'] = post_title
    }
    if (post_category) {
      params['post_category'] = post_category
    }
    if (price) {
      params['price'] = price
    }
    if (this.postPerPage) {
      params['posts_per_page'] = this.postPerPage
    }
    if (this.currentPage) {
      if (this.postPerPage) {
        if (callFrom === 'pagination') {
          params['page_no'] = this.currentPage
        } else {
          params['page_no'] = 1
        }
      }
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
        if (callFrom == 'btn') {
          this.loader = false
        }
        this.isSkeltonLoader = false
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
        this.fullPageLoaderService.hideLoader()
        if (callFrom == 'btn') {
          this.loader = false
        }
        this.isSkeltonLoader = false
      },
    })
  }

  public handlePageChange(event: number): void {
    this.isPaginationClick = true
    this.currentPage = event

    if (this.findBusinessForm.value.post_title) {
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
      // Initialize the map with a default center
      this.map = new google.maps.Map(mapElement, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      const bounds = new google.maps.LatLngBounds()

      // Loop through latitude and longitude arrays to create markers
      for (let i = 0; i < this.latitude.length; i++) {
        const position = {
          lat: parseFloat(this.latitude[i]),
          lng: parseFloat(this.longitude[i]),
        }

        const marker = new google.maps.Marker({
          position: position,
          map: this.map,
          title: 'Marker Title',
        })

        bounds.extend(position)
      }

      this.map.fitBounds(bounds)
    } else {
      console.error('Map element not found.')
    }
  }

  public getAddress(place: any) {
    if (place === null) {
      this.street = null
    } else {
      // Update street with the new address value if needed
      this.street = place.formatted_address || ''
    }

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
    // this.debouncedSearchBusiness()
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
  }
  public getUrl(url: string) {
    window.open(url, '_blank')
  }

  public gotToListing(item: any, isGlobal: any) {
    console.log('hello')
    let slug = item?.slug
      ? item.slug
      : createSlug(item?.post_id, item?.post_title)

    this.router.navigate(['/business-details', slug], {
      state: { isGlobal, id: item?.post_id },
    })
  }

  getAndBindLocalStorageData() {
    let savedPostTitle = this.localStorage.getData('post_title')
    let savedCategoryId = this.localStorage.getData('post_category')

    if (this.category_id || savedCategoryId) {
      this.findBusinessForm
        .get('post_category')
        ?.setValue(Number(this.category_id || savedCategoryId))
      this.category_id = Number(this.category_id || savedCategoryId)
      this.localStorage.removeData('post_title')
    } else {
      this.findBusinessForm.controls['post_title'].setValue(
        this.post_title || savedPostTitle,
      )
      this.localStorage.removeData('post_category')
    }

    for (let i = 0; i < this.valuesForLocalStorageKey.length; i++) {
      const key = this.valuesForLocalStorageKey[i] as keyof this
      // if we are getting address from params then ignore the local storage
      if (!this[key]) {
        this[key] = this.localStorage.getData(key as string)
      }
    }
    this.findBusinessForm.controls['slidervalue'].setValue(
      Number(this.localStorage.getData('slidervalue')),
    )
    this.findBusinessForm.controls['price'].setValue(
      this.localStorage.getData('price'),
    )
  }

  ngAfterViewInit() {
    this.fullPageLoaderService.showLoader()
    this.getUserBlogs()
    // this.getIPAdress()
    this.getIPAddress()
    // this.initMap()
    // console.log(this.route.snapshot.paramMap, 'this.route.snapshot.paramMap')
    this.getAndBindLocalStorageData()
    if (
      this.country ||
      this.state ||
      this.city ||
      this.street ||
      this.zipcode ||
      this.post_title ||
      this.category_id ||
      this.findBusinessForm.get('post_category')?.value ||
      this.findBusinessForm.get('post_title')?.value
    ) {
      console.log('hello')
      // if (this.post_title) {
      //   // this.findBusinessForm.get('post_title')?.setValue(this.post_title)
      // }
      if (this.category_id) {
        console.log('hello2')
        // this.findBusinessForm.get('post_category')?.setValue(this.category_id)
        this.getBusinessCat()
      } else {
        this.searchBusiness()
      }
    } else {
      this.getPublishBusinessData()
    }

    // this.findBusinessForm.controls['slidervalue'].setValue(0)
  }

  ngOnDestroy() {
    for (let i = 0; i < this.valuesForLocalStorageKey.length; i++) {
      const key = this.valuesForLocalStorageKey[i] as keyof this
      console.log(this[key] as string, 'valueess')
      if (this[key]) {
        this.localStorage.saveData(key as string, this[key] as string)
      }
    }
    if (this.findBusinessForm.get('post_title')?.value) {
      this.localStorage.saveData(
        'post_title',
        this.findBusinessForm.get('post_title')?.value,
      )
    }
    if (this.findBusinessForm.get('post_category')?.value) {
      this.localStorage.saveData(
        'post_category',
        this.findBusinessForm.get('post_category')?.value,
      )
    }
    // console.log(this.city, 'this.city')
    // console.log(this.state, 'this.state')
    // console.log(this.fullAddress, 'this.fulladde')
    // console.log(this.zipcode, 'this.zip')
    // console.log(this.country, 'this.country')
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe()
    }
  }
}
