import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { FullPageLoaderService } from '@vietlist/shared'
import { FindEventParams } from 'src/app/manage-business/service/business.interface'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { createSlug } from 'src/app/shared/helper'
import { register } from 'swiper/element/bundle'

register()
@Component({
  selector: 'app-cta-verified-business',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cta-verified-business.component.html',
  styleUrl: './cta-verified-business.component.scss',
})
export class CtaVerifiedBusinessComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  @Input() homePageData?: any
  public verfiedBusiness?: any

  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
  ) {}

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
        spaceBetween: 20,
      },
      1920: {
        slidesPerView: 5,
      },
    },
    on: {
      init() {},
    },
  }

  ngOnInit() {
    this.getPublishBusinessData()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  public verifiedImage: {
    image: string
    verified_logo: string
  }[] = [
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
  ]

  public getPublishBusinessData() {
    this.fullPageLoaderService.showLoader()
    const params: FindEventParams = {
      posts_per_page: 10,
      page_no: 1,
      verified_data: '1',
    }
    this.businessCategoriesService.ListingBusiness(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        console.log('check verfied data', res)
        this.verfiedBusiness = res.data
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

  public handleVerfiedBusiness(isGlobal: any) {
    this.router.navigate(['/business-listing'], {
      queryParams: { isGlobal: isGlobal },
    })
  }
}
