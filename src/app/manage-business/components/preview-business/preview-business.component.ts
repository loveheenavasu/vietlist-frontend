import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import {
  Component,
  ChangeDetectorRef,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  HostListener,
} from '@angular/core'
import { ImageModalSwiperComponent } from 'src/app/manage-event/components/image-modal-swiper/image-modal-swiper.component'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms'
import {
  AuthenticationService,
  FullPageLoaderService,
  LocalStorageService,
} from '@vietlist/shared'
import { CommonModule, NgIf } from '@angular/common'
import { EventService } from 'src/app/manage-event/service/event.service'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import Swal from 'sweetalert2'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { VideoPlayComponent } from '../../video-play/video-play.component'
import { AddVideoComponent } from 'src/app/manage-event/components/add-video/add-video.component'
// import { MatDialogRef, , MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-preview-business',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    NgIf,
    TabsModule,
    AutocompleteComponent,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    TruncateHtmlPipe,
    MatButtonModule,
  ],
  templateUrl: './preview-business.component.html',
  styleUrl: './preview-business.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PreviewBusinessComponent {
  public postId: any
  public businessFormDetails: any
  public logo: any

  public map: google.maps.Map | null = null // Declare and initialize the map property
  public footerPageContent?: any
  public previewForm: FormGroup
  public latitude!: number
  public longitude!: number
  public userDetails: any
  public hourFilter: any
  public eventDetails: any
  public eventLocation: any
  public overllRating: any

  public directionStreet: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public directionLatitude: any
  public directionLongitude: any
  public currentAddress: any
  public isDistanceLoading: any
  public distanceToEvent: any
  public timeEstimate: any
  public minDate = new Date()
  public maxDate: any
  public videoTab: any = 'all'
  public videosTypeArr: any[] = []
  public openingHour: any[] = []
  public isVideoTypeLoading: boolean = true
  public isLoading: boolean = false
  subject = 'Hello' // Replace with the email subject
  body = 'Hello, I hope you are doing well'
  // public mainTabOption: any
  @ViewChild('secondDialog', { static: true }) secondDialog!: TemplateRef<any>
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private businessService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    public router: Router,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
    private cd: ChangeDetectorRef,
    // private sessionservice: AuthenticationService,
  ) {
    this._route.params.subscribe((res) => {
      this.postId = res['id']
    })
    this.previewForm = this.fb.group({
      post_title: new FormControl(''),
      post_content: new FormControl(''),
      business_email: new FormControl(''),
      contact_phone: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      zip: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      post_tags: new FormControl(''),
      street: new FormControl(''),
      website: new FormControl(''),
      mapview: new FormControl(''),
      default_category: new FormControl(''),
      owner_name: new FormControl(''),
      business_historybackground: new FormControl(''),
      mission__vision: new FormControl(''),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      region: new FormControl(''),
      special_offers: new FormControl(''),
      consultation_description: new FormControl(''),
      consultation_mode: new FormControl(''),
      consultation_booking_link: new FormControl(''),
      services_list: new FormControl(''),
      price: new FormControl(''),
    })
    // this.previewForm =fb.group({
    //    post_title = new FormControl(''),
    //    post_content = new FormControl(''),
    //    business_email = new FormControl(''),
    //    contact_phone = new FormControl(''),
    //    latitude = new FormControl(''),
    //    longitude = new FormControl(''),
    //    zipcode = new FormControl(''),
    //    state = new FormControl(''),
    //    country = new FormControl('')
    //    city = new FormControl('')
    //    post_tags = new FormControl('')
    //    street = new FormControl('')
    //    website = new FormControl('')
    //    mapview = new FormControl('')
    //    post_category = new FormControl('')
    //    default_category= new FormControl('')
    // })
  }

  userDetailss: any

  ngOnInit() {
    if (this.postId) {
      this.getBusinessFormDetails()

      // this.getVideosList(this.postId, this.videoTab)
    }
    this.authService.userDetails.subscribe((res: any) => {
      if (res) {
        this.userDetails = res
      }
    })
    this.authService.userDetailResponse.subscribe((res) => {
      this.userDetailss = res
    })
  }

  dataget: any
  gettags: any

  // public claimlisting() {
  //   this.router.navigateByUrl('/claim-business')
  // }

  videoUrl: any = []

  public getBusinessFormDetails() {
    this.isLoading = true
    this.fullPageLoaderService.showLoader()
    this.businessService.getBusiness(this.postId).subscribe({
      next: (res) => {
        this.isLoading = false
        this.fullPageLoaderService.hideLoader()
        this.dataget = res?.data || 'NA'
        this.businessFormDetails = res?.data[0]
        if (res?.data[0]?.business_hours) {
          this.openingHour = this.parse(res?.data[0]?.business_hours)
        }

        this.eventLocation = res?.data[0]?.street

        if (this.businessFormDetails?.video_upload?.length) {
          this.videoUrl.push(...this.businessFormDetails?.video_upload)
        }
        if (this.businessFormDetails?.video_url) {
          this.videoUrl.push(this.businessFormDetails?.video_url)
        }
        this.getAllVideosList(this.postId)
        if (this.businessFormDetails.event_id) {
          this.getEventDetails()
        }

        const business_hours = this.businessFormDetails?.business_hours
        this.hourFilter = this.getCleanedBusinessHours(business_hours)
        this.previewForm.patchValue(this.businessFormDetails)
        this.logo = res?.data[0]?.logo
        this.latitude = Number(this.businessFormDetails.latitude)
        this.longitude = Number(this.businessFormDetails.longitude)
        this.cd.detectChanges()
        this.initMap()
        // this.post_title = this.businessFormDetails.post_title ? this.businessFormDetails.post_title : 'NA',
        // this.post_content = this.businessFormDetails.post_content ? this.businessFormDetails.post_content : 'NA',
        // this.business_email=this.businessFormDetails.business_email ? this.businessFormDetails.business_email : 'NA',
        // this.contact_phone=this.businessFormDetails.contact_phone ? this.businessFormDetails.contact_phone : 'NA',
        // this.website=this.businessFormDetails.website ? this.businessFormDetails.website : 'Na',
        // this.mapview=this.businessFormDetails.mapview ? this.businessFormDetails.mapview : 'NA',
        // this.post_category=this.businessFormDetails.post_category?.map((category: any) => category?.id),
        // this.default_category= this.businessFormDetails.default_category ? this.businessFormDetails.default_category.id : 'NA'

        this.initMap()
      },
      error: (err) => {
        this.isLoading = false
      },
    })
  }

  public gotToEventDetails(id: any, isGlobal: any) {
    this.router.navigate(['/event-details', id], {
      queryParams: { isGlobal: isGlobal },
    })
  }

  public getCleanedBusinessHours(hours: any): string {
    // Remove array braces and commas

    return hours

      .replace(/\[|\]/g, '') // Remove square brackets
      .replace(/,/g, ' ') // Replace commas with spaces
  }

  openGoogleMaps() {
    const mapUrl = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`
    window.open(mapUrl, '_blank')
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
      console.error('Map element not found.')
    }
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

  public manageBusiness() {
    this.router.navigateByUrl('/manage-profile/my-business')
  }
  public goToEvent() {
    this.router.navigateByUrl('/manage-profile/manage-events')
  }

  activeTab: string = 'profile'

  public setActiveTab(tab: string) {}

  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService
      .getEventDetailsByPostId(this.businessFormDetails?.event_id)
      .subscribe({
        next: (res) => {
          this.eventLocation = res?.data[0]?.street
          this.fullPageLoaderService.hideLoader()
          ;(this.eventDetails = res?.data[0] || 'NA'),
            (this.overllRating = Number(res.data[0].overall_rating))
          this.latitude = Number(this.eventDetails?.latitude)

          this.longitude = Number(this.eventDetails?.longitude)
          this.initMap()
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
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  public editBusiness() {
    // this.localStorageService.saveData('postId', this.postId)
    this.router.navigate(['/edit-business/', this.postId])
  }

  openDialogs() {
    this.dialog.open(this.secondDialog, {
      width: '45%',
      //panelClass: 'myDialogStyle'
    })
  }
  // openDialogs() {
  //   const dialogRef = this.dialog.open(templateRef);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  public addBusiness(val?: any) {
    // this.isloader = true
    const body: any = {
      post_title: this.businessFormDetails?.post_title,
      contact_phone: this.businessFormDetails?.conatact_phone,
      business_email: this.businessFormDetails?.business_email,
      post_category: this.businessFormDetails?.post_category,
      default_category: this.businessFormDetails?.default_category,
      latitude: this.businessFormDetails?.latitude,
      longitude: this.businessFormDetails?.longitude,
      city: this.businessFormDetails?.city,
      region: this.businessFormDetails?.region,
      country: this.businessFormDetails?.country,
      zip: this.businessFormDetails.zip,
      post_content: this.businessFormDetails.post_content,
      website: this.businessFormDetails.website,
      post_tags: this.businessFormDetails.post_tags,
      street: this.businessFormDetails.post_tags,
      logo: this.businessFormDetails.logo,
      mapview: this.businessFormDetails.mapView,
      post_id: this.postId,
      final_submission: 1,
    }
    this.businessService.addBusiness(body).subscribe({
      next: (res) => {
        this.router.navigate(['/manage-profile/my-business'])
        if (res) {
          this.localStorageService.removeData('isConsultationFormFilled')
        }
      },
      error: (err) => {},
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

  public degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
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

  screensize: any = '35%'
  dialogWidth: any
  height: any
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screensize = event.target.innerWidth
  }

  public addVideo() {
    console.log(this.userDetailss?.level_id, 'this.userDetail')
    if (this.userDetailss?.level_id != '3') {
      Swal.fire({
        toast: true,
        text: 'Please upgrade your plan to upload videos',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      if (this.screensize > 720) {
        this.dialogWidth = '65%'
      } else if (this.screensize < 720) {
        this.dialogWidth = '90%'
        this.height = '80%'
      }

      const dialogRef = this.dialog.open(AddVideoComponent, {
        width: this.dialogWidth,
        height: this.height,
        data: {
          postId: this.postId,
        },
      })
      dialogRef.afterClosed().subscribe((result) => {
        this.getAllVideosList(this.postId)
        this.getVideosList(this.postId, this.videoTab)
      })
    }
  }

  public onTabClick(tab: any) {
    this.isVideoTypeLoading = true
    this.videoTab = tab
    if (this.videoTab == 'all') {
      this.getAllVideosList(this.postId)
    } else {
      this.getVideosList(this.postId, this.videoTab)
    }
  }

  public redirectToWhatsApp(number: any) {
    const whatsappUrl = `https://wa.me/${number}`
    window.open(whatsappUrl, '_blank')
  }

  public redirectToMail(email: string) {
    const mailToUrl = `mailto:${email}?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(this.body)}`
    window.location.href = mailToUrl
  }

  public openGoogleMapss(address: string) {
    console.log(address, 'address')
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`
    window.open(googleMapsUrl, '_blank')
  }

  public getVideosList(postId: any, tab: any) {
    this.isVideoTypeLoading = true
    this.fullPageLoaderService.showLoader()
    this.businessService.getVideoIntegration(postId, tab).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.videosTypeArr = res.data
        this.isVideoTypeLoading = false
      },
      error: (err: any) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  public getAllVideosList(postId: any) {
    this.fullPageLoaderService.showLoader()
    this.isVideoTypeLoading = true
    this.businessService.getAllVideoIntegration(postId).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.videosTypeArr = res.data || []
        if (this.videoTab == 'all') {
          console.log('alllllli')
          console.log(this.videoUrl, 'videoUrlvideoUrl')
          this.videosTypeArr?.push(
            ...this.videoUrl?.map((elem: any) => {
              return {
                video_id: '0',
                post_id: this.postId,
                user_id: 'na',
                name: 'NA',
                video_url: [elem],
                video_type: 'all',
                thumbnail_image: false,
                isEditHide: true,
              }
            }),
          )
        }
        this.isVideoTypeLoading = false
      },
      error: (err: any) => {
        this.fullPageLoaderService.hideLoader()
        console.log(err, 'error')
      },
    })
  }

  public playVideo(item: any, index: number): void {
    this.dialog.open(VideoPlayComponent, {
      width: 'auto',
      height: 'auto',
      data: { item, index }, // Pass item and index as data
    })
  }

  show247(time: string): string {
    let slicedTime = time.slice(3, time.length)

    if (slicedTime === '00:00-00:00') {
      return `${time.slice(0, 2)} 24 Hours`
    } else return time
  }
  public formatDate(dateString: string, callFrom?: string): string {
    console.log(dateString, 'dateString', callFrom)
    if (!dateString) return ''

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  public editVideo(item: any, index: number) {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      data: { item, index },
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllVideosList(this.postId)
      this.getVideosList(this.postId, this.videoTab)
    })
  }

  public deleteVideo(videoId: any) {
    Swal.fire({
      title: 'Do you really want to delete this video?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.businessService.deleteVideo(videoId).subscribe({
          next: (res: any) => {
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
            this.getAllVideosList(this.postId)
            this.getVideosList(this.postId, this.videoTab)
          },
        })
      }
    })
  }
}

export class DialogContentExampleDialog {}
