import { CommonModule, NgIf } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NavigationExtras, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { register } from 'swiper/element/bundle'

register()

@Component({
  selector: 'app-buisness-category',
  standalone: true,
  imports: [NgIf, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './buisness-category.component.html',
  styleUrl: './buisness-category.component.scss',
})
export class BuisnessCategoryComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef
  @Input() homePageData?: any
  public $destroy = new Subject<void>()
  public businessCat: any[] = []
  public businessCategoryContent?: any

  swiperParams = {
    slidesPerView: 1,
    navigation: true,
    spaceBetween: 30,
    disableOnInteraction: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 5,
      },
      1500: {
        slidesPerView: 6,
      },
    },
    on: {
      init() {},
    },
  }
  constructor(
    private businessService: BusinessService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCategroies()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const swiperEl = this.swiper.nativeElement
      Object.assign(swiperEl, this.swiperParams)
      swiperEl.initialize()
    })
  }

  getCategroies() {
    this.businessService
      .getBusinessCat()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (res: any) => {
          this.businessCat = res.data
        },
      })
  }

  public getTrustedHTML(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString)
  }

  public handleCategory(item: any) {
    if (item) {
      this.router.navigate(['/find-business/', item?.id])
    }
  }

  public blogCat() {
    this.router.navigateByUrl('/business-categories')
  }

  ngOnDestroy() {
    this.$destroy.next()
    this.$destroy.complete()
  }
}
