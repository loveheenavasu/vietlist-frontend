import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  ViewEncapsulation,
} from '@angular/core'
import { EventService } from '../../../manage-event/service/event.service'
import { CommonModule, DatePipe, NgIf, TitleCasePipe } from '@angular/common'
import {
  AuthenticationService,
  FullPageLoaderService,
  LocalStorageService,
  Roles,
} from '@vietlist/shared'
import { NgxDropzoneModule } from 'ngx-dropzone'
// import { Lightbox } from 'ngx-lightbox';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { SkeletonLoadingComponent } from 'src/app/common-ui/skeleton-loading/skeleton-loading.component'
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ImageModalSwiperComponent } from 'src/app/manage-event/components/image-modal-swiper/image-modal-swiper.component'
import { AddVideoComponent } from 'src/app/manage-event/components/add-video/add-video.component'
import { ForgotPasswordComponent } from 'src/app/auth'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { EmailMarketingServiceService } from 'src/app/email-marketing/service/email-marketing-service.service'
import { VideoPlayComponent } from '../../video-play/video-play.component'
// NgxStarRatingModule
@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    FormsModule,
    TitleCasePipe,
    DatePipe,
    CommonModule,
    NgbRatingModule,
    AutocompleteComponent,
    NgIf,
    SkeletonLoadingComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    LoaderComponent,
    MatIconModule,
    TabsModule,
    TruncateHtmlPipe,
  ],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class BusinessDetailsComponent {
  public selectedDates: Date[] = []
  public isDesabledform: boolean = false
  public booking_date: any = new FormControl('')
  public number_of_booking = new FormControl('')
  public loader: boolean = false
  public footerPageContent?: any
  public reviewForm!: FormGroup
  public isImageUploading: boolean = false
  public files: File[] = []
  public levelOneImageArr: any[] = []
  public rating = 0
  public postId: any
  public eventDetails: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public latitude: number = 0
  public longitude: number = 0
  public userDetails: any
  public isGlobal: any
  public isLoader: boolean = false
  public reviewsArray: any[] = []
  public isAuthenticationCheck: any
  public isReplyFieldOpen: boolean = false
  public isReplycomFieldOpen: boolean = false
  public replyIndex: number = -1
  public replyIndexshow: number = -1
  public isAuthentecate!: boolean
  public slectedvalue: boolean = false
  public storValues: any
  public userDetail: any
  public replyInput = new FormControl('')
  public commentId: any
  public repliesArray: any[] = []
  public overllRating: any
  public activeTab: string = 'profile'
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public street: any
  public eventLocation: any
  public directionStreet: any
  public directionLatitude: any
  public directionLongitude: any
  public distanceToEvent: any
  public isDistanceLoading: boolean = false
  public timeEstimate: any
  public currentAddress: string = '' // Property to store the current address
  public ratingMessage: string = ''
  public hoveredRating: number = 0
  public businessListing: boolean = false
  public eventPrice: any
  public isDateMatched: boolean = false
  public role = Roles
  public term_and_condition = new FormControl('')
  public convertedBookingDate: any
  public date = new Date()
  public isBookingLoader: boolean = false
  public eventNumberOfBooking: any
  public numberofBookingPrice: any
  public eventEndDate: any
  public claimedBusinessStatus: any
  public post_category: any = {}
  public newsletter: FormGroup
  public minDate = new Date()
  public isBookableClicked: boolean = false
  public maxDate: any
  public openingHour: any[] = []

  /**
   *
   *
   * @param eventService
   * @param _activatedRoute
   * @param fullPageLoaderService
   * @param router
   * @param fb
   * @param businessService
   * @param profileService
   * @param footerContent
   * @param sessionService
   */

  constructor(
    private eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private profileService: ProfileService,
    private sessionService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private emailMarketingService: EmailMarketingServiceService,
  ) {
    this.reviewForm = this.fb.group({
      comment_content: ['', Validators.required],
      rating: ['', Validators.required],
      comment_author: [''],
      comment_author_email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      comment_author_url: [''],
    })
    this.newsletter = this.fb.group({
      First_name: ['', Validators.required],
      Last_name: ['', Validators.required],
      email: ['', Validators.required],
    })

    this.sessionService.isAuthenticated$.subscribe((res: any) => {
      if (res) {
        this.isAuthentecate = res
        const controlsToValidate = ['comment_author_email', 'comment_author']

        controlsToValidate.forEach((controlName) => {
          const control = this.reviewForm.get(controlName)
          if (!res) {
            control?.setValidators(Validators.required)
          } else {
            control?.clearValidators()
          }
          control?.updateValueAndValidity()
        })
      }
    })

    this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
    })
    this._activatedRoute.queryParams.subscribe((res) => {
      this.isGlobal = res['isGlobal']
    })

    this.number_of_booking.valueChanges.subscribe((res) => {
      if (res) {
        this.numberofBookingPrice = Number(res) * Number(this.eventPrice)
      }
    })
  }

  get First_name() {
    return this.newsletter.get('First_name')
  }
  get Last_name() {
    return this.newsletter.get('Last_name')
  }
  get email() {
    return this.newsletter.get('email')
  }

  addSubscriber() {
    this.fullPageLoaderService.showLoader()
    this.emailMarketingService
      .addSubscriber({ ...this.newsletter.value, post_id: this.postId })
      .subscribe(
        () => {
          this.fullPageLoaderService.hideLoader()
          Swal.fire({
            toast: true,
            text: 'subscriber added successfully',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })

          this.newsletter.reset()
        },
        () => {
          this.fullPageLoaderService.hideLoader()
        },
      )
  }

  parse(originalStr: string) {
    if (originalStr) {
      const cleanedStr = originalStr.replace(/\\|"/g, '')
      // Convert the cleaned string to a valid JSON string
      const validJsonStr = `[${cleanedStr
        .split('][')
        .map(
          (arr) =>
            `${arr
              .split(',')
              .map((val) => `"${val.replaceAll(']', '').replaceAll('[', '')}"`)
              .join(',')}`,
        )
        .join(',')}]`
      let arr = JSON.parse(validJsonStr)
      let utc = arr[arr.length - 2] + ' ' + arr[arr.length - 1]
      arr.splice(arr.length - 2, 2)
      arr.push(utc)
      return arr
    }
  }

  getIntegrationVideo() {
    this.businessService.getAllVideoIntegration(this.postId).subscribe({
      next: (res) => {
        if (res?.data) {
          this.videoUrl.push(...res?.data)
        }
      },
      error: (error) => {},
    })
  }

  public gotToEventDetails(id: any, isGlobal: any) {
    this.router.navigate(['/event-details', id], {
      queryParams: { isGlobal: isGlobal },
    })
  }

  ngOnInit() {
    this.getIntegrationVideo()
    // this.getBusinessCat()
    if (
      this._activatedRoute.snapshot.routeConfig?.path?.includes(
        'business-details',
      )
    ) {
      console.log('its is business detail')
      if (this.postId) {
        this.businessListing = true
        this.getBusinessFormDetails()
      }
    } else if (
      this._activatedRoute.snapshot.routeConfig?.path?.includes('event-details')
    ) {
    }

    if (this.postId) {
      this.businessListing = false
      // this.getEventDetails()
    }
    this.getReviews()

    const Token = localStorage.getItem('accessToken')

    if (Token) {
      console.log('check1')
      this.fetchProfileDetail()
      this.fetchClamiedBusinessStatus()
    }
  }

  public formatDate(dateString: string): string {
    if (!dateString) return ''

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  public checkIsClaimButtonVisible(
    eventDetails: any,
    userDetail: any,
  ): boolean {
    const isOwnerAssociate = eventDetails?.business_ownerassociate == '0'
    const isBusinessOwner = userDetail?.user_role === this.role.businessOwner
    const isLevel = userDetail?.level_id === '3' || userDetail?.level_id === '2'
    // console.log(isBusinessOwner, isBusinessOwner, isLevel, this.isAuthentecate)
    if (
      this.claimedBusinessStatus == 'pending' ||
      this.claimedBusinessStatus == 'approved' ||
      eventDetails?.user_deatil?.user_id == userDetail?.ID
    ) {
      return false
    }
    return isOwnerAssociate && this.isAuthentecate && isBusinessOwner && isLevel
  }

  public fetchClamiedBusinessStatus() {
    const postId = this.postId
    this.eventService.getClaimBusinessLisiting(postId).subscribe({
      next: (res) => {
        console.log('check claimed lsiiting', res)
        this.claimedBusinessStatus = res.data
      },
      error: (err) => {},
    })
  }

  public showRatingMessage(event: any): void {
    this.hoveredRating = event
    if (this.hoveredRating >= 4) {
      this.ratingMessage = 'Excellent'
    } else if (this.hoveredRating >= 3) {
      this.ratingMessage = 'Average'
    } else if (this.hoveredRating >= 2) {
      this.ratingMessage = 'Poor'
    } else if (this.hoveredRating >= 1) {
      this.ratingMessage = 'Terrible'
    } else {
      this.ratingMessage = 'Select a rating'
    }
  }

  public showRatingMessageLeave(): void {
    this.hoveredRating = 0
    if (this.rating >= 4) {
      this.ratingMessage = 'Excellent'
    } else if (this.rating >= 3) {
      this.ratingMessage = 'Average'
    } else if (this.rating >= 2) {
      this.ratingMessage = 'Poor'
    } else if (this.rating >= 1) {
      this.ratingMessage = 'Terrible'
    } else {
      this.ratingMessage = 'Select a rating'
    }
  }

  public updateRatingMessage(rating: any): void {
    console.log('cehck rating', rating)
    if (rating >= 4) {
      this.ratingMessage = 'Excellent'
    } else if (rating >= 3) {
      this.ratingMessage = 'Average'
    } else if (rating >= 2) {
      this.ratingMessage = 'Poor'
    } else if (rating >= 1) {
      this.ratingMessage = 'Terrible'
    } else {
      this.ratingMessage = 'Select a rating'
    }
  }

  public saveDetailsInLocal() {
    this.localStorageService.saveData(
      'reviewFormData',
      JSON.stringify(this.reviewForm.value),
    )
  }

  videoUrl: any = []
  public getAddress(place: any) {
    this.directionStreet = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.forEach((element: any) => {
      element.types.forEach((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
        }
      })
    })
    this.directionLatitude = place.geometry.location.lat()
    this.directionLongitude = place.geometry.location.lng()
    this.cd.detectChanges()
    this.initMap()
  }

  public goToEvent() {
    this.router.navigateByUrl('/manage-profile/manage-events')
  }

  public getBusinessFormDetails() {
    this.fullPageLoaderService.showLoader()
    this.businessService.getBusiness(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()

        // this.dataget = res?.data || 'NA'
        this.eventDetails = res?.data[0]

        if (res?.data[0]?.business_hours) {
          this.openingHour = this.parse(res?.data[0]?.business_hours)
        }
        if (res?.data[0]?.event_id) {
          this.getEventDetails()
        }
        this.eventLocation = res?.data[0]?.street
        if (this.eventDetails?.video_upload) {
          this.videoUrl.push({
            video_id: '0',
            post_id: this.postId,
            user_id: 'na',
            name: 'NA',
            video_url: this.eventDetails?.video_upload,
            video_type: 'all',
            thumbnail_image: false,
            isEditHide: true,
          })
        }
        if (this.eventDetails?.video_url) {
          this.videoUrl.push({
            video_id: '0',
            post_id: this.postId,
            user_id: 'na',
            name: 'NA',
            video_url: [this.eventDetails?.video_url],
            video_type: 'all',
            thumbnail_image: false,
            isEditHide: true,
          })
        }
        ;(this.latitude = Number(this.eventDetails?.latitude)),
          (this.longitude = Number(this.eventDetails?.longitude))
        this.cd.detectChanges()
        this.initMap()
      },
      error: (err) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  eventInfo: any

  public playVideo(item: any, index: number): void {
    this.dialog.open(VideoPlayComponent, {
      width: 'auto',
      height: 'auto',
      data: { item, index }, // Pass item and index as data
    })
  }

  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService
      .getEventDetailsByPostId(this.eventDetails?.event_id)
      .subscribe({
        next: (res) => {
          this.eventInfo = res?.data[0]
          this.fullPageLoaderService.hideLoader()
          // const currentDate: string =
          //   this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? ''
          // const startDate = res.data[0]?.event_dates?.start_date
          // const endDate = res.data[0]?.event_dates?.end_date
          // const startDateNew = this.extractDateFromTimestamp(startDate)
          // const endDateNew = this.extractDateFromTimestamp(endDate)
          // // this.eventEndDate = this.eventDetails.booking
          // if (currentDate > res?.data[0]?.booking_end_date) {
          //   this.isDesabledform = true
          // }
          // if (startDateNew == endDateNew) {
          //   this.isDateMatched = true
          // } else {
          //   this.isDateMatched = false
          // }

          // ;(this.eventDetails = res?.data[0] || 'NA'),
          //   (this.eventLocation = this.eventDetails?.street)
          // this.overllRating = Number(res.data[0].overall_rating)
          // ;(this.latitude = Number(this.eventDetails?.latitude)),
          //   (this.longitude = Number(this.eventDetails?.longitude))
          // this.eventPrice = this.eventDetails.price
          // this.eventNumberOfBooking = this.eventDetails.number_of_bookings
          // this.initMap()
        },
        error: (err) => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  public getnumberOfBooking() {
    console.log(this.number_of_booking, 'nn')
  }
  public dateFilter: DateFilterFn<Date | null> = (date: Date | null) => {
    if (date !== null) {
      const selectedTimestamp = date.getTime() // Get timestamp of selected date
      const startDateString = this.eventDetails?.event_dates.start_date
      const endDateString = this.eventDetails?.event_dates.end_date

      if (startDateString && endDateString) {
        const startDate = new Date(startDateString)
        const endDate = new Date(endDateString)

        const startTime = startDate.getTime() // Get timestamp of start date
        const endTime = endDate.getTime() // Get timestamp of end date

        if (selectedTimestamp >= startTime && selectedTimestamp <= endTime) {
          return true // Date is within the range, enable it
        } else {
          console.error('Selected date is not within the range')
          return false // Date is not within the range, disable it
        }
      } else {
        console.error('Invalid start or end date')
        return false // Either start date or end date is invalid, disable it
      }
    } else {
      console.error('Invalid date')
      return false // No date selected, disable it
    }
  }

  public extractDateFromTimestamp(timestamp: any) {
    const parts = timestamp?.split('T')
    const datePart = parts[0]
    return datePart
  }

  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      this.map = new google.maps.Map(mapElement, {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
          map: this.map,
          title: 'Marker Title',
        })
      }
    } else {
    }
  }

  openGoogleMaps() {
    const mapUrl = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`
    window.open(mapUrl, '_blank')
  }

  show247(time: string): string {
    let slicedTime = time.slice(3, time.length)

    if (slicedTime === '00:00-00:00') {
      return `${time.slice(0, 2)} 24HR`
    } else return time
  }
  public onSelectImages(event: any) {
    this.files = [...event.addedFiles]
    this.displayLevelOneImages()
  }

  public displayLevelOneImages() {
    let maxImages: any = 5
    this.isImageUploading = true

    const filesToUpload = this.files.slice(0, maxImages)

    filesToUpload.forEach((file, index) => {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
      }
      reader.readAsDataURL(file)

      // Upload each file
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false
          this.levelOneImageArr.push(res.image_url)
          if (this.levelOneImageArr.length >= maxImages) {
            this.isImageUploading = false
          }
        },
        error: (err: any) => {
          this.isImageUploading = false
          // Handle errors if needed
        },
      })
    })
  }

  public removeImageItem(index: any) {
    this.levelOneImageArr.splice(index, 1)
  }

  public submit() {
    this.isLoader = true
    var body
    if (this.userDetail) {
      body = {
        comment_post_ID: this.postId,
        rating: this.reviewForm.value.rating,
        comment_content: this.reviewForm.value.comment_content,
        user_id: this.userDetail?.ID,
      }
    } else {
      body = {
        comment_post_ID: this.postId,
        // user_id: this.eventDetails?.user_detail?.user_id,
        rating: this.reviewForm.value.rating,
        comment_author_url: this.reviewForm.value.comment_author_url,
        comment_author_email: this.reviewForm.value.comment_author_email,
        comment_author: this.reviewForm.value.comment_author,
        comment_content: this.reviewForm.value.comment_content,
        // attachments: this.levelOneImageArr,
      }
    }

    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue))
        })
      } else {
        formData.append(key, String(value))
      }
    })
    formData.forEach((value, key) => {})
    if (this.reviewForm.valid) {
      this.profileService.reviewSet(formData).subscribe({
        next: (res) => {
          this.isLoader = false
          this.getReviews()
          this.reviewForm.reset()
          if (this.eventDetails?.event_id) {
            this.getEventDetails()
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
        error: (err) => {
          this.isLoader = false
        },
      })
    } else {
    }
  }

  public getReviews() {
    this.businessService.GetReviewList(this.postId).subscribe({
      next: (res) => {
        console.log('check review', res)
        this.reviewsArray = res?.data
      },
    })
  }

  public showReplyField(index: number) {
    if (
      this.userDetail.level_id !== '3' &&
      this.userDetail.user_role == Roles.businessOwner
    ) {
      Swal.fire({
        toast: true,
        text: 'Upgrade your plan to Elite!',
        animation: false,
        icon: 'warning',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      this.isReplyFieldOpen = true
      this.replyIndex = index
    }
  }

  public toggleReply(index: number, id: any) {
    if (this.isReplycomFieldOpen && this.replyIndexshow === index) {
      this.hideReplyField(index)
    } else {
      this.showReplyCommentField(index, id)
    }
  }

  public showReplyCommentField(index: number, id: any) {
    // this.replyIndexshow = index
    console.log('check index', index, this.replyIndexshow)
    this.replyIndexshow = index
    this.isReplycomFieldOpen = true
    this.getReplies(index, id)
  }

  public hideReplyField(index: number) {
    this.isReplycomFieldOpen = false
    this.replyIndexshow = -1
    this.replyIndex = -1
  }

  public handlereply(index: any, commentId: any) {
    this.commentId = commentId
    const body = {
      comment_post_ID: this.postId,
      comment_content: this.replyInput.value,
      comment_parent: this.commentId,
    }
    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue))
        })
      } else {
        formData.append(key, String(value))
      }
    })
    this.eventService.setReviewReply(formData).subscribe({
      next: (res) => {
        this.replyInput.setValue('')
        this.isReplyFieldOpen = false
        this.getReplies(index, this.commentId)
      },
    })
  }

  public getReplies(index: any, id: any) {
    this.repliesArray = []
    this.loader = true
    this.isReplycomFieldOpen = true
    this.replyIndexshow = index
    this.eventService
      .getReviewReply(this.commentId ? this.commentId : id, this.postId)
      .subscribe({
        next: (res) => {
          this.repliesArray = res?.data
          this.loader = false
          console.log(this.repliesArray, 'Replies Array')
          if (this.repliesArray.length == 0) {
            Swal.fire({
              toast: true,
              text: 'REPLIES NO FOUND!',
              animation: false,
              icon: 'warning',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
          }
        },
        error: (err) => {},
      })
  }

  public fetchProfileDetail() {
    this.fullPageLoaderService.showLoader()
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.userDetail = res.data.user
        console.log('check userDetails', this.userDetail)
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  public openDialog(imageData: any, index: number) {
    console.log('click os work', imageData)
    this.dialog.open(ImageModalSwiperComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: { images: imageData, index },
    })
  }

  public scrollTo(elementId: string): void {
    const element = document.getElementById(elementId)
    this.activeTab = elementId
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.directionLatitude = position.coords.latitude
          this.directionLongitude = position.coords.longitude
          this.getAddressFromCoords(
            this.directionLatitude,
            this.directionLongitude,
          )
        },
        (error) => {},
      )
    } else {
    }
  }

  public getAddressFromCoords(latitude: number, longitude: number): void {
    const geocoder = new google.maps.Geocoder()
    const latlng = new google.maps.LatLng(latitude, longitude)
    geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.currentAddress = results[0].formatted_address
          // Update input field value here
          this.directionStreet = this.currentAddress
          // Optionally, you can also trigger change detection manually
          // this.cd.detectChanges();
        } else {
        }
      } else {
      }
    })
  }

  public calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    this.isDistanceLoading = true
    const earthRadius = 6371 // Earth's radius in kilometers
    const dLat = this.degreesToRadians(lat2 - lat1)
    const dLon = this.degreesToRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return distance // Distance in kilometers
  }

  // Helper function to convert degrees to radians
  public degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  public getDistance(): void {
    if (!this.directionLatitude && !this.directionLongitude) {
      Swal.fire({
        toast: true,
        text: 'Address not found.',
        animation: false,
        icon: 'warning',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      const distanceToEvent = this.calculateDistance(
        this.directionLatitude,
        this.directionLongitude,
        this.latitude,
        this.longitude,
      )
      const averageSpeedKmPerHour = 60
      const timeInHours = distanceToEvent / averageSpeedKmPerHour
      const timeInMinutes = Math.round(timeInHours * 60)
      let timeEstimate: string
      if (timeInMinutes < 60) {
        timeEstimate = `${timeInMinutes} minutes`
      } else {
        const hours = Math.floor(timeInMinutes / 60)
        const minutes = timeInMinutes % 60
        timeEstimate = `${hours} hours ${minutes} minutes`
      }
      this.distanceToEvent = distanceToEvent.toFixed(2)
      this.timeEstimate = timeEstimate

      const mapElement: any = document.getElementById('map')
      const map = new google.maps.Map(mapElement, {
        zoom: 7,
        center: { lat: this.directionLatitude, lng: this.directionLongitude },
      })

      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(map)

      const request = {
        origin: this.directionStreet,
        destination: this.eventLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      }

      directionsService.route(request, function (response: any, status: any) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response)
        } else {
        }
      })

      const fromMarker = new google.maps.Marker({
        position: { lat: this.directionLatitude, lng: this.directionLongitude },
        map: map,
        title: 'From',
      })

      const toMarker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: map,
        title: 'To',
      })
    }
  }

  public handleBookingNow(details: any) {
    console.log('check deatils', details)
    this.isBookingLoader = true
    if (!this.isAuthentecate) {
      Swal.fire({
        toast: true,
        text: 'To book an event, please log in first.',
        animation: false,
        icon: 'warning',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      // const dataObj = { eventId: this.eventDetails.post_id , eventPrice:this.eventDetails.price , date:this.booking_date.value ? this.booking_date.value : this.eventDetails?.event_dates?.start_date , bookingNumber: this.number_of_booking.value };
      // console.log(dataObj , "DATAOBJ")
      const data = {
        event_id: this.eventDetails.post_id,
        person_id: this.userDetail.user_id,
        booking_price: this.eventDetails.price,
        booking_date: this.booking_date.value
          ? this.booking_date.value
          : this.eventDetails?.event_dates?.start_date,
        number_of_booking: this.number_of_booking.value,
      }
      this.eventService.addEventBooking(data).subscribe({
        next: (res) => {
          this.isBookingLoader = false
          if (res) {
            // this.router.navigate(['/target-component'], { queryParams: { ids: ids.join(',') } });
            this.router.navigate(['/booking-payment'], {
              queryParams: {
                eventId: details?.post_id,
                bookingId: res.booking_detail.booking_id,
                numberOfBooking: this.number_of_booking.value,
              },
            })
          }
        },
        error: (err) => {
          this.isBookingLoader = false
        },
      })
    }
  }

  public claimlisting(item: any) {
    this.router.navigate(['/claim-business', item.post_id], {
      queryParams: { listingTitle: item.post_title },
    })
  }

  screensize: any = '35%'
  dialogWidth: any
  height: any
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screensize = event.target.innerWidth
  }

  public addVideo() {
    if (this.screensize > 720) {
      this.dialogWidth = '55%'
    } else if (this.screensize < 720) {
      this.dialogWidth = '90%'
      this.height = '55%'
    }

    this.dialog.open(AddVideoComponent, {
      width: this.dialogWidth,
      height: this.height,
    })
  }
  // public getBusinessCat() {
  //   this.businessService.getBusinessCat().subscribe({
  //     next: (res: any) => {
  //       console.log(res.data, 'res.data')
  //       this.post_category = res.data

  //       for (let i = 0; i < res.data; i++) {
  //         this.post_category[res.data[i].id] = res.data[i].name
  //       }
  //     },
  //     error: (err) => {},
  //   })
  // }
}
