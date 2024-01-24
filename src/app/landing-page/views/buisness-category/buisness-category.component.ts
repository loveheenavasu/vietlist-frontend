import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { register } from 'swiper/element/bundle'

register()

@Component({
  selector: 'app-buisness-category',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './buisness-category.component.html',
  styleUrl: './buisness-category.component.scss',
})
export class BuisnessCategoryComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef

  swiperParams = {
    slidesPerView: 1,
    autoplay: true,
    spaceBetween: 30,
    disableOnInteraction: false,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1388: {
        slidesPerView: 6,
      },
    },
    on: {
      init() {},
    },
  }
  constructor() {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }
}
