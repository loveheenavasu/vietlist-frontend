import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
} from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { firstValueFrom } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-blog-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-blog-details.component.html',
  styleUrl: './user-blog-details.component.scss',
})
export class UserBlogDetailsComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  @ViewChild('blogSwiper') swiperBlog!: ElementRef
  public selectedCommentReply: any | null = null
  public blogId: any
  public userdetails: any
  public userBlogDetails: any
  public showReplyForm: boolean = false
  public showReplyFormMore: boolean = false
  public selectedComment: any | null = null
  public blogIdtwo: any
  public addDetail: any[] = []
  public lastElement: any
  public multipleSpaceId: string[] = []
  public multipleAdId: string[] = []
  public ipAddress: any
  public isAuthenticated: boolean = false
  public name = new FormControl()
  public email = new FormControl()
  public website = new FormControl()
  public message = new FormControl()
  public commentArr: any
  public UserId: any
  public isPostComment: boolean = false
  public userDetailscomment: any
  public CheckValues: any
  public blogSwiperParams = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000,
    },
    slidesPreview: 1,
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
      init() {},
    },
  }
  constructor(
    private IpService: ProfileService,
    private authentication: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private homeService: HomepageService,
    private _activatedRoute: ActivatedRoute,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private loaderService: FullPageLoaderService,
    private router: Router,
  ) {
    this.isAuthenticated = this.authentication.isAuthenticated()

    let localStorage: any

    // Check if local Storage is available
    if (typeof window !== 'undefined') {
      // Access localStorage only in browser environment
      localStorage = window.localStorage
    }

    if (localStorage) {
      this.UserId = localStorage.getItem('loginInfo')
      this.userDetailscomment = localStorage.getItem('userDetailscomment')
      const data = JSON.parse(this.userDetailscomment)
      ;(this.CheckValues = data?.checkedValue),
        this.name.setValue(data?.comment_name)
      this.email.setValue(data?.comment_email)
      this.website.setValue(data?.comment_website)
    }
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
        spaceBetween: 15,
      },
      1920: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
    },
    on: {
      init() {},
    },
  }
  public verifiedImage: {
    image: string
    verified_logo: string
  }[] = [
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image:
        'https://vietlist.biz/staging_dev/wp-content/uploads/2023/10/Virtual-Staging-And-Its-Impact-On-Modern-Real-Estate-Sales-113617143-1-768x439.jpg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
  ]
  ngOnInit() {
    // this.showAdBlogPage()
    this.getIPAddress()
    if (this.blogId) {
      this.getComments()
    }
  }

  // public getIPAdress() {
  //   this.IpService.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip
  //   })
  // }
  public async getIPAddress(): Promise<string> {
    try {
      const res: any = await firstValueFrom(this.IpService.getIPAddress())
      this.ipAddress = res.ip
      this.showAdBlogPage()
      return res.ip
    } catch (error) {
      throw new Error('Error fetching IP address: ' + error)
    }
  }

  ngAfterViewInit(): void {
    // this.showAdBlogPage()
    this.cdr.detectChanges()
    const divElement = this.elRef.nativeElement.querySelector('.blog-content')
    const pElements = divElement?.getElementsByTagName('p')
    const h3Elements = divElement?.getElementsByTagName('h3')
    const ulElements = divElement?.getElementsByTagName('ul')
    for (let i = 0; i < pElements?.length; i++) {
      const pElement = pElements[i]
      const h3Element = h3Elements[i]
      const ulElement = ulElements[i]

      // const imgElement = pElements[i].querySelector('img');
      // if (imgElement) {
      //   this.renderer.setStyle(imgElement, 'width', '100%', RendererStyleFlags2.Important);
      //   this.renderer.setStyle(imgElement, 'height', '100%', RendererStyleFlags2.Important);
      // }
      if (ulElement) {
        const liElements = ulElement?.getElementsByTagName('li')
        if (liElements) {
          for (let j = 0; j < liElements.length; j++) {
            const liElement = liElements[j]
            this.renderer.setStyle(
              liElement,
              'line-height',
              '30px',
              RendererStyleFlags2.Important,
            )
          }
        }
      }
      if (h3Element) {
        Object.assign(h3Element.style, {
          fontWeight: '300',
          margin: '20px 0',
          color: '#232F3E',
          fontSize: '27px',
        })
      }

      // Apply line-height to the current p tag
      this.renderer.setStyle(
        pElement,
        'line-height',
        '30px',
        RendererStyleFlags2.Important,
      )
    }
  }

  public editProfile() {
    this.router.navigateByUrl('/manage-profile')
  }

  public logout() {
    this.authentication.clearAuthentication()
  }

  public myBrowser() {
    if (
      (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) != -1
    ) {
      return 'Opera'
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      return 'Chrome'
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
      return 'Safari'
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
      return 'Firefox'
    } else if (
      navigator.userAgent.indexOf('MSIE') != -1 ||
      !!(document as any).documentMode == true
    ) {
      return 'IE'
    } else {
      return 'unknown'
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = this.padZero(date.getMonth() + 1)
    const day = this.padZero(date.getDate())
    const hours = this.padZero(date.getHours())
    const minutes = this.padZero(date.getMinutes())
    const seconds = this.padZero(date.getSeconds())
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }
  public setStats(ad_id?: string, space_id?: string) {
    const currentDate = new Date()
    const actionTime = this.formatDate(currentDate)
    const currentRoute = window.location.href

    const body = {
      space_id: space_id ? space_id : this.multipleSpaceId,
      ad_id: ad_id ? ad_id : this.multipleAdId,
      action_type: space_id && ad_id ? 'click' : 'view',
      action_time: actionTime,
      user_ip: this.ipAddress,
      browser: this.myBrowser(),
      page_url: currentRoute,
    }
    this.homeService.setStats(body).subscribe({
      next: (res: any) => {},
      error: (err) => {},
    })
  }
  getUserBlog() {
    this.loaderService.showLoader()
    this.homeService.userBlogs('10', '1').subscribe({
      next: (res) => {
        if (res) {
          this.loaderService.hideLoader()
          this.userdetails = res?.data
        }
      },
      error: (err) => {
        this.loaderService.hideLoader()
      },
    })
  }
  public valueChange(detailsUser: any) {
    this.CheckValues = detailsUser.target.checked
  }

  public getUserBlogDetail() {
    this.loaderService.showLoader()
    this.homeService
      .userBlogsDetail(this.blogIdtwo ? this.blogIdtwo : this.blogId)
      .subscribe({
        next: (res) => {
          if (res) {
            this.userBlogDetails = res?.data
            this.loaderService.hideLoader()
          }
        },
        error: (err) => {
          this.loaderService.hideLoader()
        },
      })
  }
  viewuserdetails(details: any) {
    this.router.navigate(['/user-blog-details/', details?.blog_id])
    this.authentication.BlogID.next(details?.blog_id)
    this.getUserBlog()
    this.getUserBlogDetail()
  }

  public toggleReplyForm(comment: any) {
    if (this.selectedComment === comment) {
      // If the same comment is clicked again, toggle the form visibility
      this.showReplyForm = !this.showReplyForm
    } else {
      // If a different comment is clicked, hide any previously shown form and display the new one
      this.selectedComment = comment
      this.showReplyForm = true
    }
  }
  public toggleReplyFormShowMore(comment: any) {
    if (this.selectedCommentReply === comment) {
      this.showReplyFormMore = !this.showReplyFormMore
    } else {
      // If a different comment is clicked, hide any previously shown form and display the new one
      this.selectedCommentReply = comment
      this.showReplyFormMore = true
    }
  }

  public goSignup() {
    this.router.navigate(['/register'])
  }

  public blogSwiperParam = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000,
    },

    on: {
      init() {},
    },
  }
  public showAdBlogPage() {
    this.homeService.showAD().subscribe({
      next: (res: any) => {
        const data = res.data.filter((item: any) => item.Page_key === 'blog ad')
        if (data) {
          this.addDetail = data[0]?.ads_detail
          if (this.addDetail) {
            if (this.swiperBlog && this.swiperBlog.nativeElement) {
              const swiperEl = this.swiperBlog.nativeElement
              Object.assign(swiperEl, this.blogSwiperParam)
              swiperEl?.initialize()
            }
          }
          this.cdr.detectChanges()
        }
      },
    })
  }
  public postCommnet() {
    if (this.CheckValues) {
      const userDetailscomment = {
        checkedValue: this.CheckValues,
        comment_name: this.name.value,
        comment_website: this.website.value,
        comment_email: this.email.value,
      }
      const userDetailscommentString = JSON.stringify(userDetailscomment)
      localStorage.setItem('userDetailscomment', userDetailscommentString)
    }
    this.isPostComment = true
    const userID = JSON.parse(this.UserId)
    const formData: any = new FormData()
    formData.append('comment_author', this.name.value)
    formData.append('comment_author_url', this.website.value)
    formData.append('comment_author_email', this.email.value)
    formData.append('comment_content', this.message.value)
    formData.append('comment_post_ID', this.blogId)

    const formData2: any = new FormData()
    formData2.append('user_id', userID?.ID)
    formData2.append('comment_author', this.name.value)
    formData2.append('comment_author_url', this.website.value)
    formData2.append('comment_author_email', this.email.value)
    formData2.append('comment_content', this.message.value)
    formData2.append('comment_post_ID', this.blogId)

    const data = !this.isAuthenticated ? formData : formData2
    this.homeService.setBlogComment(data).subscribe({
      next: (res) => {
        this.authentication.responseApi.next(true)
        this.getComments()
        this.isPostComment = false
        this.cdr.detectChanges()

        this.message.setValue('')
        this.website.setValue('')
        this.name.setValue('')
        this.email.setValue('')
        Swal.fire({
          toast: true,
          text: res.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      },
      error: (err) => {
        this.isPostComment = false
      },
    })
  }

  public postReply() {
    const userID = JSON.parse(this.UserId)
    const formData: any = new FormData()
    formData.append('comment_author', this.name.value)
    formData.append('comment_author_url', this.website.value)
    formData.append('comment_author_email', this.email.value)
    formData.append('comment_content', this.message.value)
    formData.append('comment_post_ID', this.blogId)
    formData.append('comment_parent', this.selectedComment)

    const formData2: any = new FormData()
    formData2.append('user_id', userID?.ID)
    formData2.append('comment_author', this.name.value)
    formData2.append('comment_author_url', this.website.value)
    formData2.append('comment_author_email', this.email.value)
    formData2.append('comment_content', this.message.value)
    formData2.append('comment_post_ID', this.blogId)
    formData2.append('comment_parent', this.selectedComment)

    const data = !this.isAuthenticated ? formData : formData2

    this.homeService.setReplyBlog(data).subscribe({
      next: (res) => {
        this.cdr.detectChanges()
        this.getComments()
        this.message.setValue('')
        this.website.setValue('')
        this.name.setValue('')
        this.email.setValue('')
        Swal.fire({
          toast: true,
          text: res.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      },
      error: (err) => {},
    })
  }

  getComments() {
    this.cdr.detectChanges()
    this.homeService.getBlogComment(this.blogId).subscribe({
      next: (res) => {
        this.commentArr = res?.data
        const lastIndex = this.commentArr.length - 1
        this.lastElement = this.commentArr[lastIndex]
        console.log(res)
      },
      error: (err) => {},
    })
  }

  public scrollTo(elementId: string): void {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
