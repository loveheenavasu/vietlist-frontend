import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { register } from 'swiper/element/bundle'

register()

@Component({
  selector: 'vietlist-card-swiper',
  templateUrl: './card-swiper.html',
  styleUrl: './card-swiper.scss',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardSwiperComponent {}
