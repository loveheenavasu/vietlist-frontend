import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-userblog',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './userblog.component.html',
  styleUrl: './userblog.component.scss'
})
export class UserblogComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  constructor() {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

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
      init() { },
    },
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
