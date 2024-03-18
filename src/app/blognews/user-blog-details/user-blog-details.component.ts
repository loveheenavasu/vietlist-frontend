import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Renderer2, RendererStyleFlags2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared';
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service';

@Component({
  selector: 'app-user-blog-details',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-blog-details.component.html',
  styleUrl: './user-blog-details.component.scss'
})
export class UserBlogDetailsComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  public blogId: any
  public userdetails: any
  public userBlogDetails: any
  public blogIdtwo: any
  constructor(private authentication: AuthenticationService, private homeService: HomepageService, private _activatedRoute: ActivatedRoute, private elRef: ElementRef, private renderer: Renderer2, private loaderService: FullPageLoaderService, private router: Router) {

    this._activatedRoute.params.subscribe((res) => {
      this.blogId = res['id']
    })
    this.authentication.BlogID.subscribe((res: any) => {
      this.blogIdtwo = res
    })

    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
    this.getUserBlog()
    this.getUserBlogDetail()
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
    
  ngAfterViewInit(): void {
    const divElement = this.elRef.nativeElement.querySelector('.blog-content');
    const pElements = divElement?.getElementsByTagName('p');
    const h3Elements = divElement?.getElementsByTagName('h3');
    const ulElements = divElement?.getElementsByTagName('ul');
    for (let i = 0; i < pElements?.length; i++) {
      const pElement = pElements[i];
      const h3Element = h3Elements[i];
      const ulElement = ulElements[i];

      // const imgElement = pElements[i].querySelector('img');
      // if (imgElement) {
      //   this.renderer.setStyle(imgElement, 'width', '100%', RendererStyleFlags2.Important);
      //   this.renderer.setStyle(imgElement, 'height', '100%', RendererStyleFlags2.Important);
      // }
      if (ulElement) {
        const liElements = ulElement?.getElementsByTagName('li');
        if (liElements) {

          for (let j = 0; j < liElements.length; j++) {
            const liElement = liElements[j];
            this.renderer.setStyle(liElement, 'line-height', '30px', RendererStyleFlags2.Important);

          }
        }
      }
      if (h3Element) {
        Object.assign(h3Element.style, {
          fontWeight: '300',
          margin: '20px 0',
          color: '#232F3E',
          fontSize: '27px'
        });
      }

      // Apply line-height to the current p tag
      this.renderer.setStyle(pElement, 'line-height', '30px', RendererStyleFlags2.Important);


    }


  }

  getUserBlog() {
    this.loaderService.showLoader()
    this.homeService.userBlogs('10','1').subscribe({
      next: (res) => {
        if (res) {
          this.loaderService.hideLoader()
          this.userdetails = res?.data
        }
      }, error: (err) => {
        this.loaderService.hideLoader()
      }

    })
  }

  public getUserBlogDetail() {
    this.loaderService.showLoader()
    this.homeService.userBlogsDetail(this.blogIdtwo ? this.blogIdtwo : this.blogId).subscribe({
      next: (res) => {
        if (res) {
          this.userBlogDetails = res?.data
          this.loaderService.hideLoader()
          console.log(res, 'resresresresresresresresres')

        }
      }, error: (err) => {
        this.loaderService.hideLoader()
      }

    })
  }
  viewuserdetails(details: any) {


    this.router.navigate(['/user-blog-details/', details?.blog_id])
    this.authentication.BlogID.next(details?.blog_id)
    this.getUserBlog()
    this.getUserBlogDetail()
  }
}
