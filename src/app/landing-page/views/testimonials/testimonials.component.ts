import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { register } from 'swiper/element/bundle'
import { testimonialData } from '@vietlist/shared'

register()

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  @ViewChild('swiperDemo') swiper!: ElementRef

  swiperParams = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    spaceBetween: 30,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1388: {
        slidesPerView: 3,
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

  public testimonialData: testimonialData[] = [
    {
      rating: '2',
      description: `Moderate children at of outweigh it. Unsatiable it considered invitation he travelling
      insensible. Consulted admitting oh mr up as described.Moderate children at of outweigh
      it. Unsatiable it considered invitation he travelling insensible. Consulted admitting oh
      mr up as described.`,
      userProfile: '/assets/image/testimonial-profile1.svg',
      userName: 'Jane Cooper',
      userCountry: 'Los Angeles, CA',
    },
    {
      rating: '4',
      description: `Moderate children at of outweigh it. Unsatiable it considered invitation he travelling
      insensible. Consulted admitting oh mr up as described.Moderate children at of outweigh
      it. Unsatiable it considered invitation he travelling insensible. Consulted admitting oh
      mr up as described.`,
      userProfile: '/assets/image/testimonial-profile1.svg',
      userName: 'Robert Fox',
      userCountry: 'New York City, NY',
    },
    {
      rating: '3',
      description: `Moderate children at of outweigh it. Unsatiable it considered invitation he travelling
      insensible. Consulted admitting oh mr up as described.Moderate children at of outweigh
      it. Unsatiable it considered invitation he travelling insensible. Consulted admitting oh
      mr up as described.`,
      userProfile: '/assets/image/testimonial-profile1.svg',
      userName: 'Jane Cooper',
      userCountry: 'Los Angeles, CA',
    },
    {
      rating: '5',
      description: `Moderate children at of outweigh it. Unsatiable it considered invitation he travelling
      insensible. Consulted admitting oh mr up as described.Moderate children at of outweigh
      it. Unsatiable it considered invitation he travelling insensible. Consulted admitting oh
      mr up as described.`,
      userProfile: '/assets/image/testimonial-profile1.svg',
      userName: 'Robert Fox',
      userCountry: 'New York City, NY',
    },
  ]

  returnCount(rating: string) {
    return Array.from({ length: +rating })
  }
}
