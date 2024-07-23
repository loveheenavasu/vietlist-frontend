import { CommonModule, DatePipe } from '@angular/common'
import { ProfileService } from './../../service/profile.service'
import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AuthenticationService,
  FullPageLoaderService,
  Roles,
} from '@vietlist/shared'
import { EventService } from 'src/app/manage-event/service/event.service'
import Swal from 'sweetalert2'
import { Subject, takeUntil } from 'rxjs'
import { CapitalizePipe } from 'src/app/shared/utils/captilize.pipe'
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [DatePipe, CapitalizePipe, CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent {
  private destroy$ = new Subject<void>()
  public allBookingsArray: any[] = []
  public postId: any
  public statusColor: any = {
    cancelled: 'Danger',
    closed: 'Danger',
    active: 'Success',
  }

  /**
   *
   * @param eventService
   */
  constructor(
    private eventService: EventService,
    private _activateRoute: ActivatedRoute,
    private fullpageoaderservice: FullPageLoaderService,
    private router: Router,
    private profileService: ProfileService,
  ) {
    this._activateRoute.params.subscribe((res) => {
      this.postId = res['id']
      if (this.postId) {
        this.fetchAllBookings()
      }
    })
  }

  ngOnInit() {
    this.fetchAllBookings()
  }

  getStatusColor = (status: string): string => {
    const normalizedStatus = status.toLowerCase()
    return this.statusColor[normalizedStatus] || 'defaultColor' // 'defaultColor' can be any fallback color you want
  }

  public fetchAllBookings() {
    this.fullpageoaderservice.showLoader()
    this.eventService
      .getMyBooking()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.fullpageoaderservice.hideLoader()
          this.allBookingsArray = res.data
        },
        error: (err) => {
          this.fullpageoaderservice.hideLoader()
        },
      })
  }

  public cancelBooking(bookingId: any, eventId: any) {
    Swal.fire({
      title: 'Do you really want to cancel this booking ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          event_id: eventId,
          booking_id: bookingId,
        }
        this.eventService.cancelEventBooking(body).subscribe({
          next: (res: any) => {
            if (res) {
              this.fetchAllBookings()
            }
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
        })
      }
    })
  }

  public goToDetails(id: any) {
    this.router.navigate(['/booking-details/', id])
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
