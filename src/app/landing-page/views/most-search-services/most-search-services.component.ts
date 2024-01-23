import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle'

register()

@Component({
  selector: 'app-most-search-services',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './most-search-services.component.html',
  styleUrl: './most-search-services.component.scss'
})
export class MostSearchServicesComponent {
  @ViewChild('mostSearchServicesSwiper') swiper!: ElementRef;

  swiperParams = {
    slidesPerView: 1,
    autoplay: true,
    spaceBetween: 10,
    disableOnInteraction: false,
    loop: true,
    speed: 3000,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1388: {
        slidesPerView: 5,
      }
    },
    on: {
      init() {
      },
    },
  };
  constructor() {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams);
      swiperEl.initialize();
    })
  }
}
