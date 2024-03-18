import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullPageLoaderService } from '@vietlist/shared';
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service';

@Component({
  selector: 'app-business-blog-details',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './business-blog-details.component.html',
  styleUrl: './business-blog-details.component.scss'
})
export class BusinessBlogDetailsComponent {
  public blogId: any
  public userBlogDetails: any
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef

  constructor(private homeService: HomepageService, private _activatedRoute: ActivatedRoute, private elRef: ElementRef, private renderer: Renderer2, private loaderService: FullPageLoaderService) {

    this._activatedRoute.params.subscribe((res) => {
      this.blogId = res['id']
    })
    this.getUserBlogDetail()

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


  public getUserBlogDetail() {
    this.loaderService.showLoader()
    this.homeService.userBlogsDetail(this.blogId).subscribe({
      next:(res)=>{
        if (res) {
          this.userBlogDetails = res?.data
          this.loaderService.hideLoader()
          console.log(res, 'resresresresresresresresres')
  
        } 
      },error:(err)=>{
        this.loaderService.hideLoader()
      }
     
    })
  }
}
