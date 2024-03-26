
import { TruncateHtmlPipe } from './../../shared/utils/truncate.pipe';
import { DatePipe, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service';
import { FullPageLoaderService } from '@vietlist/shared';
import { register } from 'swiper/element/bundle';
import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

register()
@Component({
  selector: 'app-businessblogs',
  standalone: true,
  imports: [DatePipe, SlicePipe, TruncateHtmlPipe],
  templateUrl: './businessblogs.component.html',
  styleUrl: './businessblogs.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessblogsComponent {
  public businessBlogArr: any[] = []
  public addDetail: any[] = []
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

  constructor(private businessBlog: HomepageService, private router: Router, private IpService: ProfileService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private fullPageLoader: FullPageLoaderService) {

  }

  ngOnInit() {
    this.getBusinessBlogsPost()
    // this.showAdBlogPage()
    this.getIPAddress()
  }

  ngAfterViewInit(): void {
    // this.showAdBlogPage()
    this.cdr.detectChanges();
  }

  public async getIPAddress(): Promise<string> {
    try {
      const res: any = await firstValueFrom(this.IpService.getIPAddress());
      console.log("RESPONSEEE", res.ip)
      this.ipAddress = res.ip
      this.showAdBlogPage()
      return res.ip;
    } catch (error) {
      throw new Error('Error fetching IP address: ' + error);
    }
  }


  public showAdBlogPage() {
    this.businessBlog.showAD().subscribe({
      next: (res: any) => {
        const data = res.data.filter((item: any) => item.Page_key === 'blog ad');
        if (data) {
          this.addDetail = data[0]?.ads_detail
          if (this.addDetail) {
            if (this.swiperBlog && this.swiperBlog.nativeElement) {
              const swiperEl = this.swiperBlog.nativeElement;
              Object.assign(swiperEl, this.blogSwiperParams);
              swiperEl.initialize();
            }
          }
          this.cdr.detectChanges()

        }
      }
    });
  }

  public count = 1
  public loadMore() {
    this.count++
    this.getBusinessBlogsPost()
  }
  public getBusinessBlogsPost() {
    this.fullPageLoader.showLoader()
    this.businessBlog.getAllBusinessBlog('12', this.count).subscribe({
      next: (res) => {
        this.fullPageLoader.hideLoader()
        this.businessBlogArr = res?.data

      },
      error: (err) => {
        this.fullPageLoader.hideLoader()
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


  // public getIPAdress() {
  //   this.IpService.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip
  //   })
  // }

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
    this.businessBlog.setStats(body).subscribe({
      next: (res: any) => {

      },
      error: (err) => {

      }
    })
  }

  public getUrl(url: string) {
    window.open(url, "_blank");
  }

  public viewblogdetails(details: any) {
    this.router.navigate(['/business-blog-details/', details])
  }

}
