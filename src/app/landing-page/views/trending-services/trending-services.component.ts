import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from '@angular/core';
import { BusinessService } from 'src/app/manage-business/service/business.service';
import { register } from 'swiper/element';
register()
@Component({
  selector: 'app-trending-services',
  standalone: true,
  imports: [NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trending-services.component.html',
  styleUrl: './trending-services.component.scss'
})
export class TrendingServicesComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  @Input() homePageData?: any

  public businessCat: any[] = []
  public trendingHeaderContent: any

  swiperParams = {
    slidesPerView: 1,
    autoplay: true,
    spaceBetween: 30,
    disableOnInteraction: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1388: {
        slidesPerView: 4,
      },
    },
    on: {
      init() { },
    },
  }
  constructor(private businessService: BusinessService) {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  ngOnInit() {
    this.getCategroies()
    this.trendingHeaderContent = this.homePageData
  }
  getCategroies() {
    this.businessService.trendingBusiness().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
        console.log("check trending", this.businessCat)
      }
    })
  }
}
