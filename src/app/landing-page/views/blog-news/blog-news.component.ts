import { Component, HostListener, Input, Output, EventEmitter, NgZone, ChangeDetectorRef, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { NgClass, NgFor } from '@angular/common'
import { blogItem } from '@vietlist/shared'
import { interval, repeat, Subscription, take } from 'rxjs'
import { register } from 'swiper/element/bundle';

register()

@Component({
  selector: 'app-blog-news',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    NgFor,
    MatGridListModule,
    NgClass,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './blog-news.component.html',
  styleUrl: './blog-news.component.scss',
})
export class BlogNewsComponent {
  @ViewChild('blogSwiper') swiperBlog!: ElementRef
  @Input() homePageData?: any
  @Input() adDetails?: any
  @Output() bannerClick: EventEmitter<{ adId: string, spaceId: string }> = new EventEmitter<{ adId: string, spaceId: string }>();
  public orderValue?: number
  public blogDetail?: any
  public blogAd?: any
  public currentIndex: number = 0
  public timerSubscription?: Subscription;
  timerIntervals: any;

  blogSwiperParams = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000
    },

    slidesPreview: 1,
    on: {
      init() { },
    },
  }

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {
    // this.startTimer();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.orderValue = window.innerWidth < 769 ? 2 : 1
    console.log(this.orderValue)
  }

  ngOnInit() {
    // this.blogDetail = this.homePageData
    this.showAdBlogPage()
    // if (this.blogAd) {
    //   // Create an interval that updates content every 6 seconds
    //   this.timerIntervals = setInterval(() => {

    //     if (this.currentIndex === (this.blogAd.length - 1)) {
    //       this.currentIndex = 0;
    //     } else {
    //       this.currentIndex++;
    //     }
    //     // Ensure Angular runs change detection after updating content
    //     this.cdr.detectChanges();
    //   }, 6000);
    // }

  }


  ngAfterContentChecked(): void {
    this.showAdBlogPage()
    this.cdr.detectChanges();
  }



  public blogItem: blogItem[] = [
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
  ]

  public showAdBlogPage() {
    if (this.adDetails) {
      this.adDetails.map((res: any) => {
        if (res.Page_key == 'Home Sidebar') {
          this.blogAd = res.ads_detail
          if (this.blogAd) {
            if (this.swiperBlog && this.swiperBlog.nativeElement) {
              const swiperEl = this.swiperBlog.nativeElement;
              Object.assign(swiperEl, this.blogSwiperParams);
              swiperEl.initialize();
            }
          }
          this.cdr.detectChanges()
          // console.log("check ad on blog page", this.blogAd)
        }
      })
    }
  }

  public CountClickStats(adId: string, spaceId: string) {
    this.bannerClick.emit({ adId, spaceId });
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.timerIntervals) {
      clearInterval(this.timerIntervals);
    }
  }

}
