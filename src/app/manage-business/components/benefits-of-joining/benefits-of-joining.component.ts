import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AuthenticationService, FullPageLoaderService, Roles } from '@vietlist/shared'
import { Subscription, firstValueFrom, interval, repeat, take } from 'rxjs'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import Swal from 'sweetalert2'
import { BusinessService } from '../../service/business.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { register } from 'swiper/element/bundle';

register()

@Component({
  selector: 'app-benefits-of-joining',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './benefits-of-joining.component.html',
  styleUrl: './benefits-of-joining.component.scss',
})
export class BenefitsOfJoiningComponent {
  @ViewChild('benefitJoining') swiper!: ElementRef
  public userRole: string = ''
  public subscriptionStatus: boolean = false
  public checkAuthentication: any
  public ipAddress: any
  public benefitsAds: any
  public multipleSpaceId: string[] = []
  public multipleAdId: string[] = []
  public intervalId: any;
  public benefitsData: any;
  public videoUrl: SafeResourceUrl | null = null;
  public currentIndex: number = 0

  swiperParams = {
    slidesPerView: 1,
    // pagination: {
    //   clickable: true
    // },
    autoplay: {
      delay: 6000
    },
    slidesPreview: 1,
    on: {
      init() { },
    },
  }

  constructor(
    private router: Router,
    private sessionservice: AuthenticationService,
    private benefitAd: HomepageService,
    private IpService: ProfileService,
    private businessService: BusinessService,
    private sanitizer: DomSanitizer,
    private fullPageLoaderService: FullPageLoaderService
  ) {
    this.sessionservice.isAuthenticated$.subscribe((res) => {
      this.checkAuthentication = res
      console.log(this.checkAuthentication, 'checkAuthentication')
    })

    this.sessionservice.userRole.subscribe((res) => {
      this.userRole = res
    })
    const data = this.sessionservice.getUserdata()
    // console.log("check role1", data)
    if (data) {
      this.userRole = data?.user_role
      // console.log("check role", data)
    }
    this.sessionservice.isSubscription$.subscribe((res) => {
      this.subscriptionStatus = res
      // console.log("check the subscription status", this.subscriptionStatus)
    })


  }
  ngOnInit() {
    this.benefitJoining()
    this.getIPAddress()
  }

  public async getIPAddress(): Promise<string> {
    try {
      const res: any = await firstValueFrom(this.IpService.getIPAddress());
      console.log("RESPONSEEE", res.ip)
      this.ipAddress = res.ip
      this.fetchSearchAd()
      return res.ip;
    } catch (error) {
      throw new Error('Error fetching IP address: ' + error);
    }
  }

  public fetchSearchAd() {
    this.benefitAd.showAD().subscribe({
      next: (res: any) => {
        res.data.forEach((data: any) => {
          if (data.Page_key == "Benifits") {
            this.benefitsAds = data.ads_detail
            setTimeout(() => {
              if (this.swiper && this.swiper.nativeElement) {
                const swiperEl = this.swiper.nativeElement;
                Object.assign(swiperEl, this.swiperParams);
                swiperEl.initialize();
              } else {

              }
            }, 0);
            this.benefitsAds.forEach((ad: any) => {
              this.multipleSpaceId.push(ad.space_id)
              this.multipleAdId.push(ad.id)
            })
            this.setStats()
          }
        })
      },
    })
  }

  public benefitJoining() {
    this.fullPageLoaderService.showLoader()
    this.businessService.benefitJoining().subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.benefitsData = res.data
        const videoId = this.extractVideoId(this.benefitsData?.video_for_registration?.video_url);
        if (videoId) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
        }
      },
      error: (err) => {
        this.fullPageLoaderService.hideLoader()
      }
    })
  }

  private extractVideoId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  }

  public CountClickStats(ad_id: string, space_id: string) {

    this.setStats(ad_id, space_id)
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
    this.benefitAd.setStats(body).subscribe({
      next: (res: any) => {
        console.log("stats ads", res)
      }
    })
  }

  public getFooterAdUrl(url: string) {
    window.open(url, "_blank");
  }

  backToLogin() {
    this.router.navigateByUrl('/login')
  }

  addBusiness() {
    console.log('check ---->', Roles.subscriber)
    if (this.userRole == Roles.subscriber) {
      console.log('check1 ---->')
      this.router.navigateByUrl('/register')
    } else if (
      this.userRole == Roles.businessOwner &&
      !this.subscriptionStatus
    ) {
      // console.log("check2")
      console.log('check2 ---->')
      Swal.fire({
        toast: true,
        text: 'Please choose plan',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      this.router.navigateByUrl('/subscription-plans')
    } else if (
      this.userRole == Roles.businessOwner &&
      this.subscriptionStatus
    ) {
      console.log('check3 ---->')
      this.router.navigateByUrl('/list-business')
    } else if (!this.userRole) {
      console.log('check3 ---->')

      this.router.navigateByUrl('/login')
    }
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
