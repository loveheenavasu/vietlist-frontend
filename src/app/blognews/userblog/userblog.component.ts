import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { Subject, takeUntil } from 'rxjs'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'

@Component({
  selector: 'app-userblog',
  standalone: true,
  imports: [TruncateHtmlPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './userblog.component.html',
  styleUrl: './userblog.component.scss',
})
export class UserblogComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  publicIpAddr!: string
  public userdetails: any = []
  public categoery: any
  public totalCount: any
  public destroy$ = new Subject<void>()
  /**
   *
   * @param authService
   * @param homeService
   * @param router
   * @param loaderService
   */
  constructor(
    private authService: AuthenticationService,
    private homeService: HomepageService,
    private router: Router,
    private loaderService: FullPageLoaderService,
  ) {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
    this.getUserBlog()
  }
  public count = 1
  public loadMore() {
    this.count++
    this.getUserBlog()
  }

  getUserBlog() {
    this.loaderService.showLoader()
    this.homeService.userBlogs('12', this.count, 'home').pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.totalCount = res
        console.log(res.data, 'res.data')
        if (res && res.data) {
          if (Array.isArray(res.data)) {
            Array.prototype.push.apply(this.userdetails, res.data)
          } else {
            this.userdetails.push(res.data)
          }
          this.loaderService.hideLoader()
        }
      },
      error: (err: any) => {
        this.loaderService.hideLoader()
      },
    })
  }

  swiperParams = {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    disableOnInteraction: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1388: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1920: {
        slidesPerView: 5,
      },
    },
    on: {
      init() {},
    },
  }

  public verifiedImage: {
    image: string
    verified_logo: string
  }[] = [
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
  ]

  public viewuserdetails(details: any) {
    this.router.navigate(['/user-blog-details/', details?.blog_id])
    this.authService.BlogID.next(details?.blog_id)
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
