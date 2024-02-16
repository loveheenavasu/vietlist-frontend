import { LoaderComponent } from 'src/app/common-ui'
import { FullPageLoaderService } from './../../../shared/utils/services/loader.service'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { NgIf } from '@angular/common'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { register } from 'swiper/element'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { FindBusinessParams } from 'src/app/manage-business/service/business.interface'
register()

@Component({
  selector: 'app-trending-services',
  standalone: true,
  imports: [
    NgIf,
    MatSelectModule,
    AutocompleteComponent,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trending-services.component.html',
  styleUrl: './trending-services.component.scss',
})
export class TrendingServicesComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  @Input() homePageData?: any

  public businessCat: any[] = []
  public trendingHeaderContent: any
  public isLoader: boolean = false
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public longitude: any
  public latitude: any

  public post_category: any[] = []
  public category = new FormControl('')
  swiperParams = {
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 30,
    disableOnInteraction: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1388: {
        slidesPerView: 4,
      },
      1500: {
        slidesPerView: 5,
      },
    },
    on: {
      init() { },
    },
  }
  constructor(
    private businessService: BusinessService,
    private fullPageloader: FullPageLoaderService,
  ) {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  ngOnInit() {
    this.getTrendingCategroies()
    this.trendingHeaderContent = this.homePageData
    this.getBusinessCat()
  }

  getTrendingCategroies() {
    this.businessService.trendingBusiness().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
      },
    })
  }

  public getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
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

    this.businessService.findBusiness(params).subscribe({
      next: (res) => {
        this.isLoader = false

        this.businessCat = res.data
      },
      error: (error) => { },
    })
  }
}
