import { DatePipe, JsonPipe } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { EventService } from 'src/app/manage-event/service/event.service'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DatePipe, TruncateHtmlPipe, JsonPipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventsComponent {
  @ViewChild('collectionSwiperr') collectionSwiper!: ElementRef
  @Input() homePageData?: any
  @Input() collectionAd?: any
  @Output() bannerClick: EventEmitter<{ adId: string; spaceId: string }> =
    new EventEmitter<{ adId: string; spaceId: string }>()
  public eventsArray: any[] = []

  collectionSwiperParams = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000,
    },
    // pagination: {
    //   clickable: true
    // },

    slidesPreview: 1,
    on: {
      init() {},
    },
  }

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.showCollectionAd()
    this.getAllEvents()
  }

  public CountClickStats(adId: string, spaceId: string) {
    this.bannerClick.emit({ adId, spaceId })
  }
  ngAfterContentChecked(): void {
    this.showCollectionAd()
  }

  showCollectionAd() {
    if (this.collectionAd) {
      if (this.collectionSwiper && this.collectionSwiper.nativeElement) {
        const swiperEl = this.collectionSwiper.nativeElement
        Object.assign(swiperEl, this.collectionSwiperParams)
        swiperEl.initialize()
      }
    }
  }

  public getUrl(url: string) {
    window.open(url, '_blank')
  }

  public gotToEventDetails(id: any, isGlobal: any) {
    this.router.navigate(['/event-details', id], {
      queryParams: { isGlobal: isGlobal },
    })
  }

  private getBrowserTimezone(): string {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.convertTimezoneIdentifier(browserTimezone)
  }

  private convertTimezoneIdentifier(timezone: string): string {
    switch (timezone) {
      case 'Asia/Calcutta':
        return 'Asia/Kolkata'
      default:
        return timezone
    }
  }

  public getAllEvents() {
    const params = {
      timezone: this.getBrowserTimezone(),
    }
    this.eventService.getPublishEvents(params).subscribe({
      next: (res) => {
        console.log(res)
        this.eventsArray = res?.data.slice(0, 3)
        console.log(this.eventsArray, 'response')
      },
    })
  }

  public allEvent() {
    this.router.navigateByUrl('/events')
  }
}
