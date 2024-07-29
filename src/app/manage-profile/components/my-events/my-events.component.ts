import { FullPageLoaderService } from '@vietlist/shared'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { EventService } from 'src/app/manage-event/service/event.service'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'
import { Subject, takeUntil } from 'rxjs'
import { createSlug } from 'src/app/shared/helper'

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [DatePipe, TruncateHtmlPipe],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent {
  public eventsArray: any[] = []
  private $destroy = new Subject<void>()

  constructor(
    private router: Router,
    private eventService: EventService,
    private fullpageloader: FullPageLoaderService,
  ) {}

  ngOnInit() {
    this.getAddedEvents()
  }

  public addEvent() {
    this.router.navigateByUrl('/add-event')
  }

  public getAddedEvents() {
    this.fullpageloader.showLoader()
    this.eventService
      .getEventsByUserId()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (res: any) => {
          console.log(res.data, 'res.data')
          this.eventsArray = res.data
          this.fullpageloader.hideLoader()
        },
        error: (err) => {
          this.fullpageloader.hideLoader()
        },
      })
  }

  public handleDelete(id: any) {
    Swal.fire({
      title: 'Do you really want to delete your event ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe({
          next: (res: any) => {
            this.getAddedEvents()
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
            this.fullpageloader.hideLoader()
          },
        })
      }
    })
  }

  public handleEdit(id: any) {
    this.router.navigate(['/edit-event/' + id])
  }

  public gotToEventDetails(item: any, isGlobal: any) {
    let slug = item?.slug
      ? item.slug
      : createSlug(item?.post_id, item?.post_title)
    this.router.navigate(['/event-details', slug], {
      state: { id: item?.post_id, isGlobal },
    })
  }

  public navigateToViewBooking(id: any) {
    this.router.navigate(['/manage-profile/all-bookings', id])
  }

  ngOnDestroy() {
    this.$destroy.next()
    this.$destroy.complete()
  }
}
