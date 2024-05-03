import { DatePipe } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { EventService } from 'src/app/manage-event/service/event.service'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DatePipe, TruncateHtmlPipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  @Input() homePageData?: any
  public eventsArray: any[] = []

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllEvents()
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
        this.eventsArray = res?.data.slice(0, 3)
        console.log(this.eventsArray, 'response')
      },
    })
  }

  public allEvent() {
    this.router.navigateByUrl('/events')
  }
}
