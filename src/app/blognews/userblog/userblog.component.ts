import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { Subject, takeUntil } from 'rxjs'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'

@Component({
  selector: 'app-userblog',
  standalone: true,
  imports: [TruncateHtmlPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './userblog.component.html',
  styleUrl: './userblog.component.scss',
})
export class UserblogComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  public publicIpAddr!: string
  public blogData: any = []
  public categoery: any
  public totalCount: any
  public destroy$ = new Subject<void>()
  /**
   *
   * @param authService
   * @param homeService
   * @param router
   * @param loaderService
   */
  constructor(
    private authService: AuthenticationService,
    private homeService: HomepageService,
    private router: Router,
    private loaderService: FullPageLoaderService,
  ) {

    this.getUserBlog()
  }
  public count = 1
  public loadMore() {
    this.count++
    this.getUserBlog()
  }

  getUserBlog() {
    this.loaderService.showLoader()
    this.homeService.userBlogs('12', this.count, 'home').pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.totalCount = res
        if (res && res.data) {
          if (Array.isArray(res.data)) {
            Array.prototype.push.apply(this.blogData, res.data)
          } else {
            this.blogData.push(res.data)
          }
          this.loaderService.hideLoader()
        }
      },
      error: (err: any) => {
        this.loaderService.hideLoader()
      },
    })
  }


  public viewblogData(details: any) {
    this.router.navigate(['/user-blog-details/', details?.blog_id])
    this.authService.BlogID.next(details?.blog_id)
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
