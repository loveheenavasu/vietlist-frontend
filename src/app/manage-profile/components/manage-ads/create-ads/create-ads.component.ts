import { MatSelectModule } from '@angular/material/select'
import { Component } from '@angular/core'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatTabsModule } from '@angular/material/tabs'
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule,
} from '@angular/material/radio'
import { AuthenticationService, LocalStorageService } from '@vietlist/shared'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { LoaderComponent } from 'src/app/common-ui'
import { COUNTRY_DATA } from '@vietlist/shared'
import { Location, TitleCasePipe } from '@angular/common'
import { SkeletonLoadingComponent } from 'src/app/common-ui/skeleton-loading/skeleton-loading.component'
@Component({
  selector: 'app-create-ads',
  standalone: true,
  imports: [
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule,
    LoaderComponent,
    FormsModule,
    TitleCasePipe,
    SkeletonLoadingComponent,
  ],
  templateUrl: './create-ads.component.html',
  styleUrl: './create-ads.component.scss',
})
export class CreateAdsComponent {
  public allSpaces: any[] = []
  public files: File[] = []
  public isImageLoading: boolean = false
  public imagePreviews: any
  public imageUrl: any
  public filesString: any
  public uploadMediaUrl: any
  public selectedBillingValue: string = ''
  public moreOptionsvisible: boolean = false
  public email: string = ''
  public createAdForm!: FormGroup
  public adsTitle: string = ''
  public adsDescription: string = ''
  public startsDateTime: string = ''
  public endsDateTime: string = ''
  public editFormData: any
  public editData: boolean = false
  public adId: any
  public countryList: any
  public selectedCountry: any
  public levelId: any
  public country: string = ''
  public region: string = ''
  public city: string = ''
  public zipcode: string = ''
  public locationData: boolean = false
  public ipAddress: string = ''
  public locationLoading: boolean = false
  public isLoader: boolean = false
  public isSubscribed: boolean = false
  loader: boolean = false
  public billingModelType = [
    { name: 'Click', value: 'CPC' },
    { name: 'Views', value: 'CPV' },
  ]

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private businessService: BusinessService,
    private sessionservice: AuthenticationService,
    private route: ActivatedRoute,
    private localstorage: LocalStorageService,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.countryList = COUNTRY_DATA
    this.route.queryParams.subscribe((params) => {
      this.adId = params['id']
      console.log('check id', this.adId)
    })

    this.createAdForm = this.fb.group({
      buyer_email: [''],
      space_id: [''],
      ad_model: [''],
      title: [''],
      description: [''],
      url: [''],
      img: [''],
      starts: [''],
      startsTime: [''],
      ends: [''],
      endsTime: [''],
      show_in_country: [''],
      capping: [''],
    })

    const data = this.sessionservice.getUserdata()
    const user_email = data?.user_email
    this.createAdForm.controls['buyer_email'].setValue(user_email)

    this.levelId = this.localstorage.getData('level_id')
  }

  ngOnInit() {
    this.handleUserSubscriptionCheck()
    this.getAllSpaces()
    if (this.adId) {
      this.getAdById()
    }
  }
  handleUserSubscriptionCheck() {
    this.loader = true
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.loader = false
        if (res?.data?.user?.level_id) {
          this.isSubscribed = true
        } else {
          this.isSubscribed = false
        }
      },
      error: (err) => {
        this.isSubscribed = false
        this.loader = false
      },
    })
  }

  goToSubscriptionPage() {
    this.router.navigate(['/subscription-plans'])
  }

  public getAdById() {
    this.profileService.getAdById(this.adId).subscribe({
      next: (res) => {
        console.log('check ad by id', res)
        this.editData = true
        this.createAdForm.controls['space_id'].setValue(res.data?.space_id)
        this.createAdForm.controls['ad_model'].setValue(
          res.data?.ad_model.toUpperCase(),
        )
        this.createAdForm.controls['title'].setValue(res.data?.title)
        this.createAdForm.controls['description'].setValue(
          res.data?.description,
        )
        this.createAdForm.controls['url'].setValue(res.data?.url)
        // this.createAdForm.controls['img'].setValue(res.data?.img)
        this.imageUrl = res.data?.img
        this.adsTitle = res.data?.title
        this.adsDescription = res.data?.description
        this.createAdForm.controls['show_in_country'].setValue(
          res.data?.show_in_country,
        )
        this.createAdForm.controls['capping'].setValue(res.data?.capping)
        this.convertTime(res.data?.starts)
      },
    })
  }

  public convertTime(time: any) {
    const timestamp = new Date(time * 1000) // Convert Unix timestamp to milliseconds
    const date = timestamp.toLocaleDateString()
    const times = timestamp.toLocaleTimeString()
    this.createAdForm.controls['starts'].setValue(date)
    console.log(date, 'time', times, 'check timestamp', timestamp)
  }

  public getAllSpaces() {
    this.profileService.getSpaces().subscribe({
      next: (res) => {
        this.allSpaces = res?.data
      },
    })
  }

  onSelectImage(event: any) {
    this.files.push(...event.target.files)

    const formData = new FormData()

    for (let i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i])
    }

    this.displayImagePreviews()
  }

  displayImagePreviews() {
    this.isImageLoading = true
    this.imagePreviews = []
    const latestFile = this.files[this.files.length - 1]
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i]
      console.log('check file', file)
      const reader = new FileReader()

      reader.onload = (e: any) => {
        const result = e.target.result
        if (typeof result === 'string') {
          this.imagePreviews.push(result)
        }
      }

      reader.readAsDataURL(file)
    }
    console.log('check files', this.files)
    this.businessService.uploadMedia(latestFile).subscribe({
      next: (res: any) => {
        this.isImageLoading = false
        this.imageUrl = res.image_url
        this.adsTitle = this.createAdForm.value.title
        this.adsDescription = this.createAdForm.value.description
        console.log('check the url', this.imageUrl)
      },
      error: (err: any) => {
        this.isImageLoading = false
        // Handle errors
      },
    })
  }

  removeItem(index: any) {
    this.imagePreviews.splice(index, 1)
  }

  public handleBillingModel(value: string) {
    this.selectedBillingValue = value
    console.log('check select value', value)
  }

  public handleMoreOptions() {
    if (this.moreOptionsvisible) {
      this.moreOptionsvisible = false
    } else {
      this.moreOptionsvisible = true
    }
  }

  public onCountrySelect() {
    this.selectedCountry = this.createAdForm.value.show_in_country
  }
  public onSelectSpace(spaceId: string) {
    console.log('check value', spaceId)
  }
  public convertDateFormat() {
    const startDate = this.createAdForm.value.starts
    const startTime = this.createAdForm.value.startsTime
    const endDate = this.createAdForm.value.ends
    const endTime = this.createAdForm.value.endsTime

    if (startDate && endDate && startTime && endTime) {
      const formattedStartDate = startDate.toISOString().split('T')[0]
      const formattedStartTime = startTime + ':00'
      const formattedEndDate = endDate.toISOString().split('T')[0]
      const formattedEndTime = endTime + ':00'

      this.startsDateTime = formattedStartDate + ' ' + formattedStartTime
      this.endsDateTime = formattedEndDate + ' ' + formattedEndTime
    }
  }

  public handleCreateAds() {
    this.isLoader = true
    this.convertDateFormat()
    const body = {
      buyer_email: this.createAdForm.value.buyer_email,
      space_id: this.createAdForm.value.space_id,
      ad_model: this.createAdForm.value.ad_model,
      title: this.createAdForm.value.title,
      description: this.createAdForm.value.description,
      url: this.createAdForm.value.url,
      img: this.imageUrl,
      starts: this.startsDateTime,
      ends: this.endsDateTime,
      show_in_country: this.selectedCountry,
      capping: this.createAdForm.value.capping,
    }
    this.profileService.createAd(body).subscribe({
      next: (res: any) => {
        this.isLoader = false
        Swal.fire({
          toast: true,
          text: 'Ad  created successfully ',
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.router.navigate(['/manage-profile/manage-ads']))
      },
      error: (err: any) => {
        this.isLoader = false
      },
    })
  }

  public updateAd() {
    this.isLoader = true
    this.convertDateFormat()
    const body = {
      buyer_email: this.createAdForm.value.buyer_email,
      space_id: this.createAdForm.value.space_id,
      ad_model: this.createAdForm.value.ad_model,
      title: this.createAdForm.value.title,
      description: this.createAdForm.value.description,
      url: this.createAdForm.value.url,
      img: this.imageUrl,
      starts: this.startsDateTime,
      ends: this.endsDateTime,
      capping: this.createAdForm.value.capping,
      ad_id: this.adId,
    }
    this.profileService.updateAd(body).subscribe({
      next: (res: any) => {
        this.isLoader = false
        this.router.navigateByUrl('manage-profile/manage-ads')
        Swal.fire({
          toast: true,
          text: 'Ad  Updated successfully ',
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        console.log('check update ad response', res)
      },
      error: () => {
        this.isLoader = false
      },
    })
  }

  public getIPAdress() {
    this.profileService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip
    })
  }

  getCurrentLocation() {
    this.locationLoading = true
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              const lat = position.coords.latitude
              const lng = position.coords.longitude

              // Reverse Geocoding API request
              const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAIL-JygwsY_2iMzSei4pjE7aCjvsn2uns&libraries=places`

              fetch(geocodingApiUrl)
                .then((response) => response.json())
                .then((data) => {
                  if (data.results && data.results.length > 0) {
                    const addressComponents = data.results[0].address_components

                    for (const component of addressComponents) {
                      if (component.types.includes('country')) {
                        this.country = component.long_name
                      } else if (
                        component.types.includes('administrative_area_level_1')
                      ) {
                        this.region = component.long_name
                      } else if (component.types.includes('locality')) {
                        this.city = component.long_name
                      } else if (component.types.includes('postal_code')) {
                        this.zipcode = component.long_name
                      }
                    }
                    this.locationLoading = false
                    this.locationData = true
                    resolve({
                      country: this.country,
                      region: this.region,
                      city: this.city,
                      zipcode: this.zipcode,
                    })
                  } else {
                    reject('Failed to fetch location details.')
                  }
                })
                .catch((error) => reject(error))
              this.locationData = false
              this.locationData = false
              this.getIPAdress()
            }
          },
          (error) => reject(error),
        )
      } else {
        reject('Geolocation is not supported by this browser.')
      }
    })
  }
}
