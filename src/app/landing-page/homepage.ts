import { NavigationEnd, Router } from '@angular/router'
import { PlanComponent } from './../susbscription-plans/index'
import { CardSwiperComponent } from './../common-ui/swipers/components/card-swiper'
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core'
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
import { interval, repeat, take } from 'rxjs'
import { register } from 'swiper/element/bundle';
import { ProfileService } from '../manage-profile/service/profile.service'

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
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class HomepageComponent {
  @ViewChild('adSwiper') swiper!: ElementRef
  logos: string[] = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    // Add more logo URLs as needed
  ]
  homePageData?: any
  currentLogoIndex = 0
  public adDetails: any;
  public showAdInTop: any
  public showAdInFooter: any
  currentIndex: number = 0;
  public multipleSpaceId: string[] = []
  public multipleAdId: string[] = []
  public ipAddress: any

  swiperParams = {
    slidesPerView: 1,
    pagination: {
      clickable: true
    },
    slidesPreview: 1,
    on: {
      init() { },
    },
  }
  constructor(
    private router: Router,
    private homePageContent: HomepageService,
    private IpService: ProfileService,
    private location: Location
  ) {
    this.getHomePageContent()
    // this.subscribeToRouterEvents()
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  ngOnInit() {
    this.getHomePageContent()
    // this.subscribeToRouterEvents()
    this.showAdDataFetch()
    if (this.showAdInFooter) {
      interval(30000)
        .pipe(take(this.showAdInFooter.length), repeat())
        .subscribe(() => {
          if (this.currentIndex === this.showAdInFooter.length - 1) {
            this.currentIndex = 0;
          }
          else {
            this.currentIndex++;
          }

        });
    }

  }

  public getIPAdress() {
    this.IpService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip
    })
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  public myBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!(document as any).documentMode == true)) {
      return 'IE';
    } else {
      return 'unknown';
    }
  }

  public setStats(ad_id?: string, space_id?: string) {
    this.getIPAdress()
    const currentDate = new Date();
    const actionTime = this.formatDate(currentDate);
    const currentRoute = window.location.href;

    const body = {
      space_id: space_id ? space_id : this.multipleSpaceId,
      ad_id: ad_id ? ad_id : this.multipleAdId,
      action_type: space_id && ad_id ? 'click' : 'view',
      action_time: actionTime,
      user_ip: this.ipAddress,
      browser: this.myBrowser(),
      page_url: currentRoute
    }
    this.homePageContent.setStats(body).subscribe({
      next: (res: any) => {
        // console.log("check stats res", res)
      }
    })
  }

  public CountClickStats(ad_id: string, space_id: string) {
    // console.log("check id", space_id, ad_id)
    this.setStats(ad_id, space_id)
  }

  public showAdDataFetch() {
    this.homePageContent.showAD().subscribe({
      next: (res: any) => {
        this.adDetails = res.data
        // console.log("check ad", this.adDetails)
        this.showAdHomePage()
      }
    })
  }


  public showAdHomePage() {
    this.adDetails.map((data: any) => {
      if (data.Page_key == 'Home Top') {
        this.showAdInTop = data.ads_detail
        // console.log("check top ad", this.showAdInTop)
      }
      if (data.Page_key == 'Home Footer') {
        this.showAdInFooter = data.ads_detail
        // console.log("check footer ads", this.showAdInFooter)
      }
      if (data.Page_key != "Search") {
        data.ads_detail.forEach((ad: any) => {
          this.multipleSpaceId.push(ad.space_id);
          this.multipleAdId.push(ad.id)
        });
        this.setStats()
      }
    })



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
        this.homePageData = res.data
      },
    })
  }

  nextLogo() {
    this.currentLogoIndex = (this.currentLogoIndex + 1) % this.logos.length
    console.log(this.currentLogoIndex)
  }

  prevLogo() {
    this.currentLogoIndex =
      (this.currentLogoIndex - 1 + this.logos.length) % this.logos.length
  }

  public findBusiness() {
    this.router.navigateByUrl('/find-business')
  }

  public listBusiness() {
    this.router.navigateByUrl('/benefits-of-joining')
  }
}
