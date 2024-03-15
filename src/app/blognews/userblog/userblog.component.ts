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
        spaceBetween: 40,
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
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
      {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
      {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
      {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
      {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      }, {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
      {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      }, {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
      {
        image: 'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
        verified_logo: '/assets/image/cta-verfied-img2.svg',
      },
    ]
}
