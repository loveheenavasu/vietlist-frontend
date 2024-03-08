import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core'
import { EventService } from '../../service/event.service'
import { CommonModule, DatePipe, NgIf, TitleCasePipe } from '@angular/common'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { NgxDropzoneModule } from 'ngx-dropzone'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { SkeletonLoadingComponent } from 'src/app/common-ui/skeleton-loading/skeleton-loading.component'

// NgxStarRatingModule
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    FormsModule,
    TitleCasePipe,
    NgxDropzoneModule,
    NgxStarRatingModule,
    DatePipe,
    CommonModule,
    AutocompleteComponent,
    NgIf,
    SkeletonLoadingComponent
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailsComponent {
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
  public isDistanceLoading:boolean = false
  public timeEstimate:any 
  public currentAddress: string = ''; // Property to store the current address

  /**
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
  }

  selcetdvalues() {
    // this.storValues ={
    //   this.
    // }
  }

  ngOnInit() {
    if (this.postId) {
      this.getEventDetails()
    }
    this.getReviews()
    const Token = localStorage.getItem('accessToken')

    if (Token) {
      this.fetchProfileDetail()
    }
  }

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

  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getEventDetailsByPostId(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        ;(this.eventDetails = res?.data[0] || 'NA'),
          (this.eventLocation = this.eventDetails?.street)
        this.overllRating = Number(res.data[0].overall_rating)
        ;(this.latitude = Number(this.eventDetails?.latitude)),
          (this.longitude = Number(this.eventDetails?.longitude))
        this.initMap()
      },
      error: (err) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
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
  public onSelectImages(event: any) {
    this.files = [...event.addedFiles]
    // if (this.levelOneImageArr.length >= 5) {
    //   Swal.fire({
    //     toast: true,
    //     text: 'You have already selected the maximum number of images allowed.Upgrade Plan for more.',
    //     animation: false,
    //     icon: 'warning',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (this.vediosHide.level_id == '1') {

    //   if (this.files.length > 5) {
    //     console.log('upload 5 images ')
    //     Swal.fire({
    //       toast: true,
    //       text: 'Max 5 images allowed. Upgrade your plan for more',
    //       animation: false,
    //       icon: 'error',
    //       position: 'top-right',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //     })
    //     return
    //   }
    // }
    this.displayLevelOneImages()
  }

  public displayLevelOneImages() {
    let maxImages: any = 5
    // if (this.files.length > maxImages) {
    //   Swal.fire({
    //     toast: true,
    //     text: `You can only select up to ${maxImages} images at a time.`,
    //     animation: false,
    //     icon: 'error',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

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
    const body = {
      comment_post_ID: this.postId,
      // user_id: this.eventDetails?.user_detail?.user_id,
      rating: this.reviewForm.value.rating,
      comment_author_url: this.reviewForm.value.comment_author_url,
      comment_author_email: this.reviewForm.value.comment_author_email,
      comment_author: this.reviewForm.value.comment_author,
      comment_content: this.reviewForm.value.comment_content,
      // attachments: this.levelOneImageArr,
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
    formData.forEach((value, key) => {
    })
    if (this.reviewForm.valid) {
      this.profileService.reviewSet(formData).subscribe({
        next: (res) => {
          this.isLoader = false
          this.reviewForm.reset()
          this.getReviews()
          this.getEventDetails()
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
        this.reviewsArray = res?.data
      },
    })
  }

  public showReplyField(index: number) {
    if (this.userDetail.level_id !== '3') {
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
  public showReplyCommentField(index: number, id: any) {

    this.isReplycomFieldOpen = true
    this.replyIndexshow = index
    this.getReplies(index, id)
  }
  // public hideReplyField() {
  //   this.isReplyFieldOpen = false;
  //   this.replyIndexshow = -1;
  // }

  public hideReplyField() {
    this.isReplycomFieldOpen = false
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
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.userDetail = res.data.user
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }

  public scrollTo(elementId: string): void {
    const element = document.getElementById(elementId)
    this.activeTab = elementId
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.directionLatitude= position.coords.latitude;
        this.directionLongitude = position.coords.longitude;
        this.getAddressFromCoords(this.directionLatitude , this.directionLongitude);

      }, (error) => {

      
      });
    } else {


    }
  }




  public getAddressFromCoords(latitude: number, longitude: number): void {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ 'location': latlng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.currentAddress = results[0].formatted_address;
          // Update input field value here
          this.directionStreet = this.currentAddress;
          // Optionally, you can also trigger change detection manually
          // this.cd.detectChanges();
        } else {
        
        }
      } else {

      }
    });
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
    const distanceToEvent = this.calculateDistance(
      this.directionLatitude,
      this.directionLongitude,
      this.latitude,
      this.longitude,
    )
    const averageSpeedKmPerHour = 60;
    const timeInHours = distanceToEvent / averageSpeedKmPerHour;
  const timeInMinutes = Math.round(timeInHours * 60);
  let timeEstimate: string;
  if (timeInMinutes < 60) {
    timeEstimate = `${timeInMinutes} minutes`;
  } else {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    timeEstimate = `${hours} hours ${minutes} minutes`;
  }
    this.distanceToEvent = distanceToEvent.toFixed(2);
    this.timeEstimate = timeEstimate;

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
