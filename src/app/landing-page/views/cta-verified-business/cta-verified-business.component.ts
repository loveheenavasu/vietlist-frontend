import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from '@angular/core'
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
  public ctaContent?: any

  constructor() {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  swiperParams = {
    slidesPerView: 1,
    // autoplay: true,
    pagination: {
      clickable: true,
    },
    spaceBetween: 30,
    disableOnInteraction: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        autoplay: true,
      },
      1388: {
        slidesPerView: 3,
        autoplay: true,
      },
      1920: {
        slidesPerView: 5,
        autoplay: true,
      }
    },
    on: {
      init() { },
    },
  }

  ngOnInit() {
    this.ctaContent = this.homePageData
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
}