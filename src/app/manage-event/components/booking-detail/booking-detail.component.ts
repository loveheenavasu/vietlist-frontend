import { CommonModule, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms'
import { RouterLink, ActivatedRoute, Router } from '@angular/router'
import { FullPageLoaderService, AuthenticationService } from '@vietlist/shared'

import { BusinessService } from 'src/app/manage-business/service/business.service'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'
import { EventService } from '../../service/event.service'
import { CapitalizePipe } from 'src/app/shared/utils/captilize.pipe'
@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    NgIf,
    TruncateHtmlPipe,
    CapitalizePipe,
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  public bookingId: any
  public businessFormDetails: any
  public logo: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public footerPageContent?: any
  public latitude!: number
  public longitude!: number
  public userDetails: any
  public hourFilter: any
  public eventDetails: any
  public eventLocation: any
  public overllRating: any
  public dataget: any
  public gettags: any
  public activeTab: string = 'profile'
  public bookingInfo: any
  public bookingPrice: any

  /**
   *
   * @param _route
   * @param fullPageLoaderService
   * @param router
   * @param authService
   * @param eventService
   */
  constructor(
    private _route: ActivatedRoute,
    private fullPageLoaderService: FullPageLoaderService,
    public router: Router,
    private authService: AuthenticationService,
    private eventService: EventService,
  ) {
    this._route.params.subscribe((res) => {
      this.bookingId = res['id']
    })
  }

  ngOnInit() {
    if (this.bookingId) {
      this.getBookingDetail()
    }
    this.authService.userDetails.subscribe((res: any) => {
      if (res) {
        this.userDetails = res
      }
    })
  }

  setActiveTab(tab: string) {}

  public getBookingDetail() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getBookingDetails(this.bookingId).subscribe({
      next: (res) => {
        this.bookingInfo = res?.data[0]
        const price = Number(this.bookingInfo.booking_price)
        this.bookingPrice = price?.toFixed(2)
        this.fullPageLoaderService.hideLoader()
        ;(this.eventDetails = res?.data[0] || 'NA'),
          (this.eventLocation = this.eventDetails?.street)
        this.overllRating = Number(res.data[0].overall_rating)
        ;(this.latitude = Number(this.eventDetails?.latitude)),
          (this.longitude = Number(this.eventDetails?.longitude))
      },
      error: (err: any) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  public scrollTo(elementId: string): void {
    this.activeTab = elementId
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
