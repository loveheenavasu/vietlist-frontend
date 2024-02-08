import { NgIf } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { register } from 'swiper/element/bundle'

register()

@Component({
  selector: 'app-buisness-category',
  standalone: true,
  imports: [NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './buisness-category.component.html',
  styleUrl: './buisness-category.component.scss',
})
export class BuisnessCategoryComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef

 public businessCat:any[]=[]
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
  constructor(private businessService:BusinessService) {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  ngOnInit(){
    this.getCategroies()
  }
  getCategroies(){
    this.businessService.getBusinessCat().subscribe({
      next:(res:any)=>{
        this.businessCat = res.data
      }
    })
  }
}
