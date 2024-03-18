import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared';
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service';
import { ProfileService } from 'src/app/manage-profile/service/profile.service';

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
  public userdetails: any
  public addDetail:any[]=[]
  public multipleSpaceId: string[] = []
  public multipleAdId: string[] = []
  public ipAddress: any
  @ViewChild('blogSwiper') swiperBlog!: ElementRef
  
  public blogSwiperParams = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000
    },
    slidesPreview: 1,
    on: {
      init() { },
    },
  }
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
 public isAuthenticated:boolean = false;

  constructor(private homeService: HomepageService,private cdr: ChangeDetectorRef, private _activatedRoute: ActivatedRoute, private elRef: ElementRef, private renderer: Renderer2, private loaderService: FullPageLoaderService , private IpService:ProfileService,private authService:AuthenticationService ) {
    this.isAuthenticated = this.authService.isAuthenticated()
    console.log(this.isAuthenticated)
    this._activatedRoute.params.subscribe((res) => {
      this.blogId = res['id']
    })
    this.getUserBlog()
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

    ngOnInit(){
      this.showAdBlogPage()
      this.getIPAdress()
    }
  
    ngAfterViewInit(){
      this.showAdBlogPage()
      this.cdr.detectChanges();
    }
  
  
    public showAdBlogPage() {
      this.homeService.showAD().subscribe({
        next: (res: any) => {
          const data = res.data.filter((item: any) => item.Page_key === 'blog ad');
          if(data){
            this.addDetail = data[0]?.ads_detail
            if(this.addDetail){
              if (this.swiperBlog && this.swiperBlog.nativeElement) {
                const swiperEl = this.swiperBlog.nativeElement;
                Object.assign(swiperEl, this.blogSwiperParams);
                swiperEl?.initialize();
              }
            }
            this.cdr.detectChanges()
            console.log( this.addDetail);
          }
        }
      });
    }
    
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


  getUserBlog() {
    this.loaderService.showLoader()
    this.homeService.userBlogs('10','1').subscribe( {
      next:(res)=>{
        if (res) {
          this.loaderService.hideLoader()
          this.userdetails = res?.data
        }
      },error:(err)=>{
        this.loaderService.hideLoader()
      }
   
    })
  }


  public myBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!(document as any).documentMode == true)) {
      return 'IE';
    } else {
      return 'unknown';
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


  public getIPAdress() {
    this.IpService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip
    })
  }

  public setStats(ad_id?: string, space_id?: string) {
    const currentDate = new Date();
    const actionTime = this.formatDate(currentDate);
    const currentRoute = window.location.href;

    const body = {
      space_id: space_id ? space_id : this.multipleSpaceId,
      ad_id: ad_id ? ad_id : this.multipleAdId,
      action_type: space_id && ad_id ? 'click' : 'view',
      action_time: actionTime,
      user_ip: this.ipAddress,
      browser: this.myBrowser(),
      page_url: currentRoute
    }
    this.homeService.setStats(body).subscribe({
      next: (res: any) => {

      },
      error:(err)=>{

      }
    })
  }

  public getUrl(url: string) {
    window.open(url, "_blank");
  }

}
