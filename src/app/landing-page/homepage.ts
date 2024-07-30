import { NavigationEnd, Router } from '@angular/router'
import { PlanComponent } from './../susbscription-plans/index'
import { CardSwiperComponent } from './../common-ui/swipers/components/card-swiper'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core'
import {
  BuisnessCategoryComponent,
  ClaimYourBuisnessComponent,
  BlogNewsComponent,
  ExplainingPlatformComponent,
  TestimonialsComponent,
  EventsComponent,
  CtaVerifiedBusinessComponent,
} from './views'
import { TrendingServicesComponent } from './views/trending-services/trending-services.component'
import { HomepageService } from './views/service/homepage.service'
import { CommonModule, Location, NgOptimizedImage } from '@angular/common'
import { Subscription, firstValueFrom, interval, repeat, take } from 'rxjs'
import { register } from 'swiper/element/bundle'
import { ProfileService } from '../manage-profile/service/profile.service'
import { ChooseLoanTypeComponent } from './views/choose-loan-type/choose-loan-type.component'
import Swiper from 'swiper'
import { LocalStorageService } from '@vietlist/shared'
import { clearSavedFilter } from '../shared/helper'
register()

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BuisnessCategoryComponent,
    ClaimYourBuisnessComponent,
    BlogNewsComponent,
    TestimonialsComponent,
    ExplainingPlatformComponent,
    CardSwiperComponent,
    EventsComponent,
    PlanComponent,
    TrendingServicesComponent,
    CtaVerifiedBusinessComponent,
    NgOptimizedImage,
    ChooseLoanTypeComponent,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class HomepageComponent {
  @ViewChild('adSwiper') swiper!: ElementRef
  @ViewChild('footerSwiper') swiperFooter!: ElementRef
  adSwiperInstance: Swiper | null = null
  footerSwiperInstance: Swiper | null = null

  logos: string[] = ['logo1.png', 'logo2.png', 'logo3.png']
  homePageData?: any
  currentLogoIndex = 0
  public adDetails: any
  public showAdInTop: any
  public showAdInFooter: any
  public multipleSpaceId: string[] = []
  public multipleAdId: string[] = []
  public ipAddress: any
  public collectionAd: any

  swiperParams = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 6000,
    },
    slidesPreview: 1,
    on: {
      init() {},
    },
  }

  footerSwiperParams = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000,
    },

    slidesPreview: 1,
    on: {
      init() {},
    },
  }
  constructor(
    private router: Router,
    private homePageContent: HomepageService,
    private IpService: ProfileService,
    private localStorage: LocalStorageService,
  ) {
    // this.getHomePageContent()
    // this.subscribeToRouterEvents()
    // this.showAdDataFetch()
    // setTimeout(() => {
    //   if (this.swiper && this.swiper.nativeElement) {
    //     const swiperEl = this.swiper.nativeElement;
    //     Object.assign(swiperEl, this.swiperParams);
    //     swiperEl.initialize();
    //   } else {
    //   }
    // }, 0);
    // this.startTimer();
  }

  ngOnInit() {
    this.showAdDataFetch()
    this.getHomePageContent()
    this.getIPAddress()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.swiper && this.swiper.nativeElement) {
        this.adSwiperInstance = new Swiper(
          this.swiper.nativeElement,
          this.swiperParams,
        )
      }
    })
  }

  public showAdDataFetch() {
    this.homePageContent.showAD().subscribe({
      next: (res: any) => {
        this.adDetails = res.data
        console.log(res.data, 'sknksnksnknskn')
        if (this.adDetails) {
          setTimeout(() => {
            if (this.swiper && this.swiper.nativeElement) {
              const swiperEl = this.swiper.nativeElement
              Object.assign(swiperEl, this.swiperParams)
              swiperEl.initialize()
            } else {
            }
          }, 0)
        }

        this.showAdHomePage()
      },
    })
  }

  // public getIPAdress() {
  //   this.IpService.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip
  //   })
  // }
  public async getIPAddress(): Promise<string> {
    try {
      const res: any = await firstValueFrom(this.IpService.getIPAddress())
      console.log('RESPONSEEE', res.ip)
      this.ipAddress = res.ip
      this.showAdDataFetch()
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
    this.homePageContent.setStats(body).subscribe({
      next: (res: any) => {},
    })
  }

  public CountClickStats(ad_id: string, space_id: string) {
    this.setStats(ad_id, space_id)
  }

  public showAdHomePage() {
    this.adDetails.map((data: any) => {
      if (data.Page_key == 'Home Top') {
        this.showAdInTop = data.ads_detail
      }
      if (data.Page_key == 'collection') {
        this.collectionAd = data.ads_detail
      }
      if (data.Page_key == 'Home Footer') {
        this.showAdInFooter = data.ads_detail

        if (this.showAdInFooter) {
          setTimeout(() => {
            if (this.swiperFooter && this.swiperFooter.nativeElement) {
              const swiperEl = this.swiperFooter.nativeElement
              Object.assign(swiperEl, this.footerSwiperParams)
              swiperEl.initialize()
            } else {
            }
          }, 0)
        }
      }
      if (data.Page_key != 'Search') {
        data.ads_detail.map((ad: any) => {
          if (!this.multipleAdId.includes(ad.id)) {
            this.multipleSpaceId.push(ad.space_id)
            this.multipleAdId.push(ad.id)
          }
        })
      }
    })
    if (this.ipAddress) {
      this.setStats()
    }
  }

  private subscribeToRouterEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/home') {
          window.location.reload()
        }
      }
    })
  }

  public getHomePageContent() {
    this.homePageContent.homePageContent().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.homePageData = res.data
        }
      },
    })
  }

  public nextLogo() {
    this.currentLogoIndex = (this.currentLogoIndex + 1) % this.logos.length
  }

  public prevLogo() {
    this.currentLogoIndex =
      (this.currentLogoIndex - 1 + this.logos.length) % this.logos.length
  }

  public findBusiness() {
    // let valuesForLocalStorageKey = [
    //   'city',
    //   'state',
    //   'zipcode',
    //   'country',
    //   'fullAddress',
    //   'price',
    //   'slidervalue',
    //   'street',
    //   'post_category',
    //   'post_title',
    // ]
    // valuesForLocalStorageKey.forEach((key) => this.localStorage.removeData(key))
    clearSavedFilter()
    this.router.navigateByUrl('/find-business')
  }

  public listBusiness() {
    this.router.navigateByUrl('/benefits-of-joining')
  }

  public getUrl(url: string) {
    window.open(url, '_blank')
  }

  public getFooterAdUrl(url: string) {
    window.open(url, '_blank')
  }
}
