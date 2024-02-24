import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { NgClass, NgFor } from '@angular/common'
import { blogItem } from '@vietlist/shared'
import { interval, repeat, take } from 'rxjs'


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
  templateUrl: './blog-news.component.html',
  styleUrl: './blog-news.component.scss',
})
export class BlogNewsComponent {
  @Input() homePageData?: any
  @Input() adDetails?: any
  @Output() bannerClick: EventEmitter<{ adId: string, spaceId: string }> = new EventEmitter<{ adId: string, spaceId: string }>();
  public orderValue?: number
  public blogDetail?: any
  public blogAd?: any
  public currentIndex: number = 0
  constructor() { }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.orderValue = window.innerWidth < 769 ? 2 : 1
    console.log(this.orderValue)
  }

  ngOnInit() {
    this.blogDetail = this.homePageData
    this.showAdBlogPage()
    if (this.blogAd) {
      interval(30000)
        .pipe(take(this.blogAd.length), repeat())
        .subscribe(() => {
          if (this.currentIndex === this.blogAd.length - 1) {
            this.currentIndex = 0;
          }
          else {
            this.currentIndex++;
          }
        });
    }
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
    this.adDetails.map((res: any) => {
      if (res.Page_key == 'Home Sidebar') {
        this.blogAd = res.ads_detail
        // console.log("check ad on blog page", this.blogAd)
      }
    })
  }

  public CountClickStats(adId: string, spaceId: string) {
    this.bannerClick.emit({ adId, spaceId });
  }

}
