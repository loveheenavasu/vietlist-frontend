import { NgClass, NgFor, NgIf, JsonPipe } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { Router, RouterOutlet } from '@angular/router'
import { NgSelectModule } from '@ng-select/ng-select'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'
import { NgxDropzoneModule } from 'ngx-dropzone'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import { LoaderComponent } from '../common-ui'
import { AutocompleteComponent } from '../shared/utils/googleaddress'
import moment from 'moment-timezone'
import { HttpClient } from '@angular/common/http'
import { BusinessService } from '../manage-business/service/business.service'
import { LocalStorageService, AuthenticationService } from '../shared/utils'
import { MatIconModule } from '@angular/material/icon'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { ProfileService } from '../manage-profile/service/profile.service'
import Swal from 'sweetalert2'
import { Country } from 'ngx-intl-tel-input-gg/lib/model/country.model'
type DayName = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
interface Day {
  name: DayName
  times: { start: string; end: string }[]
}
@Component({
  selector: 'app-add-real-estate-business',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    NgSelectModule,
    NgxIntlTelInputModule,
    NgClass,
    NgFor,
    NgIf,
    RouterOutlet,
    LoaderComponent,
    NgxDropzoneModule,
    JsonPipe,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatCheckboxModule,
    AutocompleteComponent,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './add-real-estate-business.component.html',
  styleUrl: './add-real-estate-business.component.scss',
})
export class AddRealEstateBusinessComponent {
  @Input() userEmail: any = ''
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public getstreet: any
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public contact_details = new FormControl()
  public business_description = new FormControl()
  public instagram = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public linkedIn = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public youTube = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public pinterest = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public snapchat = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public tikTok = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public whatsApp = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public reddit = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])

  public isLoader: boolean = false
  public facebook = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public twitter = new FormControl('', [
    Validators.pattern(
      /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
    ),
  ])
  public additionalEmail: any = new FormControl('', [
    Validators.email,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    this.emailMatchValidator.bind(this),
  ])
  public minDate = new Date()
  public maxDate: any
  public latitude: number = 0
  public longitude: number = 0
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public selectedData: any
  public selectedTimeZone: any
  public isFormFilled: boolean = false
  public currentSelectedWeek: any[] = []
  public filess: any
  public Timezone: {
    region: string
    timeZones: { country: string; offset: string }[]
  }[] = []
  public isVideoUploading: boolean = false
  public isImageUploading: boolean = false
  public timeZones: {
    region: string
    zones: { name: string; offset: string }[]
  }[] = []
  public selectedWeek: string[] = []
  public isLastRemoved: boolean[] = []
  public imageUrlsArr: any[] = []
  public days: Day[] = [
    { name: 'Mo', times: [{ start: '', end: '' }] },
    { name: 'Tu', times: [{ start: '', end: '' }] },
    { name: 'We', times: [{ start: '', end: '' }] },
    { name: 'Th', times: [{ start: '', end: '' }] },
    { name: 'Fr', times: [{ start: '', end: '' }] },
    { name: 'Sa', times: [{ start: '', end: '' }] },
    { name: 'Su', times: [{ start: '', end: '' }] },
  ]
  public CompleteProfile!: FormGroup
  public formattedData!: any[]
  public selected24HrDay: any[] = []
  public showTimeTable: boolean = false
  public isSubmitted: boolean = false
  public direction: string = ''
  public fullAddress: any
  public filesString: any
  public files: File[] = []
  public businessLogoUrl: any[] = []
  public isImageLoading: boolean = false
  public imageUrl: any
  public addOnBlur = true
  readonly separatorKeysCodes: any = [ENTER, COMMA] as const
  public services: any[] = []
  public announcer = inject(LiveAnnouncer)
  public imagePreviews: any[] = []
  public userDetails: any
  public companyName = new FormControl('', Validators.required)
  selectedCountry: CountryISO = CountryISO.UnitedStates

  @ViewChild('phoneEle') phoneEle: any

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private localstorage: LocalStorageService,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private profileServce: ProfileService,
  ) {
    this.authService.userDetailResponse.subscribe((res) => {
      this.userDetails = res
      // this.getRealEstateUserDetails()
    })
    // Now, you can use timezone-related functions safely
    const timeZoneNames = moment?.tz?.names()
    timeZoneNames?.forEach((timeZone) => {
      const country = timeZone?.split('/')[0]
      const region = timeZone?.split('/')[0].replace(/_/g, ' ')
      const utcOffset = moment?.tz(timeZone).utcOffset()

      let regionObject = this.Timezone?.find((item) => item.region === region)
      if (!regionObject) {
        regionObject = { region: region, timeZones: [] }
        this.Timezone.push(regionObject)
      }

      const hours = Math.floor(Math.abs(utcOffset) / 60)
      const minutes = Math.abs(utcOffset) % 60
      const offsetString = `UTC${utcOffset >= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      regionObject.timeZones.push({ country: country, offset: offsetString })
    })

    this.isLastRemoved = new Array<boolean>(this.days.length).fill(false)

    this.formatData()
  }

  public ngOnInit() {
    console.log(this.userEmail)
    this.additionalEmail?.setValidators([
      Validators.email,
      this.emailMatchValidator(this.userEmail),
    ])
    if (this.additionalEmail.value == this.userEmail) {
      alert('You can;t use same regisered email')
    }
  }

  setCountryByDialCode(dialCode: string) {
    dialCode = dialCode.replace('+', '')
    const allCountries = this.phoneEle.allCountries
    const country = allCountries.find((c: Country) => c.dialCode === dialCode)

    if (country) {
      this.selectedCountry = country.iso2 as CountryISO
      this.cd.detectChanges()
    }
  }

  onChangeNumber(event: any) {
    const phoneNumber = this.contact_details.value?.number
    console.log(phoneNumber, 'phoneNumber  ')
    this.contact_details.setValue(phoneNumber)
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const additionalEmail = control.value
    return additionalEmail && additionalEmail === this.userEmail
      ? { emailMatch: true }
      : null
  }

  public getAddress(place: any) {
    this.fullAddress = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
      element.types.filter((type: any) => {
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
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
    this.cd.detectChanges()
  }
  combineMultipleTime(time: string[]) {
    let result: any[] = []
    let dayName: Record<DayName, boolean> = {
      Mo: true,
      Tu: true,
      We: true,
      Th: true,
      Fr: true,
      Sa: true,
      Su: true,
    }
    for (let index = 0; index < time.length; index++) {
      const day = time[index].slice(0, 2) as DayName
      if (dayName[day]) {
        result.push(time[index])
      } else {
        result.push(`${result.pop()},${time[index]}`)
      }
    }
    return result
  }

  parse(originalStr: string): any[] {
    if (originalStr) {
      const cleanedStr = originalStr.replace(/\\|"/g, '')
      // Remove the outermost square brackets
      const trimmedStr = cleanedStr.slice(1, -1)
      // Split the string into an array of substrings
      const substrings = trimmedStr.split('],[')

      // Extract the first substring and flatten it
      const firstArray = substrings[0].replace(/\[|\]/g, '').split(',')
      const flattenedFirstArray = firstArray.map((item) => item.trim())

      // Extract the second substring and join its elements into a single string
      const secondArray = substrings[1].replace(/\[|\]/g, '').split(',')
      const joinedSecondArray = secondArray.join(' ')

      // Combine the elements of the first array with the joined elements of the second array
      const result = [...flattenedFirstArray, joinedSecondArray]

      return result
    } else {
      return []
    }
  }

  changeTimeZoneFormat(str: string) {
    if (str) {
      // Split the string into parts using the space character
      const parts = str.split(' ')

      // Find the UTC offset part (e.g., "UTC:++03:00")
      const utcPart = parts.find((part) => part.startsWith('UTC:'))

      // If there is no UTC offset part, return the original string
      if (!utcPart) {
        return str
      }

      // Extract the offset value from the UTC part (e.g., "++03:00")
      const offset = utcPart.slice(4)

      // Find the timezone name part (e.g., "Timezone:Africa")
      const timezonePart = parts.find((part) => part.startsWith('Timezone:'))

      // If there is no timezone name part, return the original string
      if (!timezonePart) {
        return str
      }

      // Extract the timezone name (e.g., "Africa")
      const name = timezonePart.slice(9)

      // Construct the formatted string
      const formattedString = `${name} - UTC${offset.replace('+', '')}`

      return formattedString
    } else {
      return ''
    }
  }

  public formatData() {
    this.formattedData = []
    this.Timezone.forEach((regionData) => {
      regionData.timeZones.forEach((timeZone) => {
        this.formattedData.push({
          label: `${timeZone.country} - ${timeZone.offset}`,
          value: `${regionData.region} `, // Adjust this as needed
        })
      })
    })
  }

  public onTimeZoneChange(event: any) {
    this.selectedTimeZone = event
  }

  onChange(time: any, difTime: any, dayName: any) {
    if (time == '00:00' && difTime == '00:00') {
      this.selectedWeek = this.selectedWeek.filter((day) => day !== dayName)
      this.currentSelectedWeek = [...this.selectedWeek]
    } else if (!this.selectedWeek.includes(dayName)) {
      this.selectedWeek.push(dayName)
      this.currentSelectedWeek = [...this.selectedWeek]
    }

    this.isTimeNotValid()
  }

  hasEmptyTime(data: Day[]): boolean {
    for (let day of data) {
      for (let time of day.times) {
        if (time.start === '' || time.end === '') {
          return true
        }
      }
    }
    return false
  }

  isTimeNotValid() {
    let non24HourFilteredDayName = this.currentSelectedWeek.filter((day) => {
      return !this.selected24HrDay.includes(day)
    })
    let non24HourFilteredDay = this.days.filter((day: any) =>
      non24HourFilteredDayName.includes(day.name),
    )
    return this.hasEmptyTime(non24HourFilteredDay)
  }

  public addTime(dayIndex: number) {
    this.days[dayIndex].times.push({ start: '', end: '' })
  }

  onWeekSelect(dayName: string, event: Event, dayIndex: number) {
    const checked = (event.target as HTMLInputElement).checked

    if (checked) {
      this.pushDay(dayName)
      this.selected24HrDay.push(dayName)
      this.days[dayIndex].times = [{ start: '', end: '' }]
    } else {
      this.selectedWeek = this.selectedWeek.filter((day) => day !== dayName)
      this.selected24HrDay = this.selected24HrDay.filter(
        (day) => day !== dayName,
      )
    }
    this.currentSelectedWeek = [...this.selectedWeek]
  }

  public removeTime(dayIndex: number, timeIndex: number) {
    this.days[dayIndex].times.splice(timeIndex, 1)
    this.isLastRemoved[dayIndex] = this.days[dayIndex].times.length === 0
  }

  pushDay(day: any) {
    if (!this.selectedWeek.includes(day)) {
      this.selectedWeek.push(day)
    }
  }

  checkHours(day: Day) {
    let { times, name } = day
    let isSelected = this.selected24HrDay.includes(name)
    if (isSelected) {
      return true
    } else {
      for (let index = 0; index < times?.length; index++) {
        if (!times[index].start && !times[index].end) {
          return false
        }
        if (times[index].start !== times[index].end) {
          this.pushDay(day?.name)
          return false
        }
      }
      this.pushDay(day?.name)
      return true
    }
  }
  pusDay(day: any) {
    if (!this.currentSelectedWeek.includes(day)) {
      this.currentSelectedWeek.push(day)
    }
  }

  addData() {
    this.days.map((day) => {
      let { times } = day
      if (!times[0].start && !times[0].end) {
        return false
      }
      if (times[0].start === times[0].end) {
        this.pusDay(day?.name)
        return true
      } else {
        this.pusDay(day?.name)
        return false
      }
    })
  }

  formatTimezone(timeZone: string[]) {
    if (timeZone?.[0]) {
      var originalString = timeZone[0]
      var parts = originalString.split(' - UTC')
      var timezone = parts[0]
      var offset = parts[1]

      // Create new object with desired format
      var newArray = [
        {
          UTC: '+' + offset,
          Timezone: timezone,
        },
      ]

      // Convert new array to JSON string
      var newJsonString = JSON.stringify(newArray)
      return newJsonString.replaceAll('{', '').replaceAll('}', '')
    } else {
      return []
    }
  }

  public onSelectLogo(event: any) {
    this.files.push(...event.addedFiles)
    const formData = new FormData()
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i])
    }
    this.displayBusinessLogo()
  }

  public displayBusinessLogo() {
    if (this.files.length === 0) {
      return // No files to upload
    }

    this.isImageLoading = true
    const latestFile = this.files[this.files.length - 1] // Get the latest file
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result as string
      this.businessService.uploadMedia(latestFile).subscribe({
        next: (res: any) => {
          this.isImageLoading = false
          this.imageUrl = res.image_url
          this.businessLogoUrl = [res.image_url] // Replace old preview with new one
        },
        error: (err: any) => {
          // Handle errors
        },
      })
    }

    reader.readAsDataURL(latestFile)
  }

  public removeItem(index: any) {
    this.businessLogoUrl.splice(index, 1)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    // Add our service
    if (value) {
      this.services.push(value)
    }

    // Clear the input value
    event.chipInput!.clear()
  }

  remove(service: any): void {
    const index = this.services.indexOf(service)

    if (index >= 0) {
      this.services.splice(index, 1)

      this.announcer.announce(`Removed ${service}`)
    }
  }

  onSelectImage(event: any) {
    this.files = [...event.addedFiles]
    if (this.files.length > 20) {
      Swal.fire({
        toast: true,
        text: 'You can upload only 20 images',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return
    }

    this.displayImagePreviews()
  }

  displayImagePreviews() {
    let maxImages: any
    if (this.files.length > maxImages) {
      Swal.fire({
        toast: true,
        text: `You can only select up to ${maxImages} images at a time.`,
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return
    }

    this.isImageUploading = true
    const filesToUpload = this.files.slice(0, maxImages)
    filesToUpload.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
      }
      reader.readAsDataURL(file)
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false
          this.imagePreviews.push(res.image_url)
          if (this.imagePreviews.length >= maxImages) {
            this.isImageUploading = false
          }
        },
        error: (err: any) => {
          this.isImageUploading = false
        },
      })
    })
  }

  public removeItems(index: any) {
    this.imagePreviews.splice(index, 1)
  }

  public submit() {
    this.isLoader = true
    const selectedDaysData = this.days.filter((day) =>
      this.currentSelectedWeek.includes(day.name),
    )

    const jsonData: { [key: string]: string[] } = {} // Use an object to group times by day

    selectedDaysData.forEach((day) => {
      day.times.forEach((time) => {
        if (!jsonData[day.name]) {
          jsonData[day.name] = []
        }
        jsonData[day.name].push(
          `${time.start || '00:00'}-${time.end || '00:00'}`,
        )
      })
    })
    const resultArray = this.currentSelectedWeek.map((day) => {
      const times = jsonData[day] ? jsonData[day].join(',') : ''
      return `${day} ${times}`
    })

    const selectedData = this.formatTimezone([this.selectedData])
    let businessHours = null
    if (selectedData?.length || resultArray?.length) {
      if (selectedData?.length) {
        businessHours = `${JSON.stringify(resultArray)},${selectedData}`
      } else {
        businessHours = `${JSON.stringify(resultArray)},[]`
      }
    }
    const body = {
      company_logo: this.businessLogoUrl,
      additional_contact_information: {
        contact: this.contact_details?.value?.nationalNumber,
        country_code: this.contact_details.value?.dialCode,
        instagram: this.instagram.value,
        facebook: this.facebook.value,
        twitter: this.twitter.value,
        additionalEmail: this.additionalEmail.value,
        snapchat: this.snapchat.value,
        tikTok: this.tikTok.value,
        reddit: this.reddit.value,
        whatsApp: this.whatsApp.value,
        youTube: this.youTube.value,
        linkedIn: this.linkedIn.value,
        pinterest: this.pinterest.value,
      },
      company_name: this.companyName.value,
      business_description: this.business_description.value,
      business_address: {
        fullAddress: this.fullAddress,
        state: this.state,
        zip: this.zipcode,
        city: this.city,
        country: this.country,
        latitude: this.latitude,
        longitude: this.longitude,
      },
      services_offered: this.services,
      business_hours: businessHours,
      gallery_images: this.imagePreviews,
    }
    this.profileServce.completeRealEstateProfile(body).subscribe({
      next: (res) => {
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
        this.isLoader = false
        this.profileServce.isProfileComplete.next(true)
        this.getRealEstateUserDetails()
      },
      error: (err) => {
        this.isLoader = false
      },
    })
  }

  ngAfterViewInit() {
    this.getRealEstateUserDetails()
  }

  public getRealEstateUserDetails() {
    this.profileServce
      .getRealEstateProfileDetails(this.userDetails?.ID)
      .subscribe({
        next: (res) => {
          this.setCountryByDialCode(
            res?.data.additional_contact_information?.country_code,
          )

          this.business_description.setValue(res?.data.business_description)
          this.companyName.setValue(res?.data?.company_name)
          this.contact_details.setValue(
            res?.data.additional_contact_information?.contact,
          )
          this.instagram.setValue(
            res?.data?.additional_contact_information?.instagram,
          )
          this.facebook.setValue(
            res?.data?.additional_contact_information?.facebook,
          )
          this.twitter.setValue(
            res?.data?.additional_contact_information?.twitter,
          )
          this.tikTok.setValue(
            res?.data?.additional_contact_information?.tikTok,
          )
          this.snapchat.setValue(
            res?.data?.additional_contact_information?.snapchat,
          )
          this.pinterest.setValue(
            res?.data?.additional_contact_information?.pinterest,
          )
          this.linkedIn.setValue(
            res?.data?.additional_contact_information?.linkedIn,
          )
          this.whatsApp.setValue(
            res?.data?.additional_contact_information?.whatsApp,
          )
          this.youTube.setValue(
            res?.data?.additional_contact_information?.youTube,
          )
          this.reddit.setValue(
            res?.data?.additional_contact_information?.reddit,
          )
          this.additionalEmail.setValue(
            res?.data?.additional_contact_information?.additionalEmail,
          )
          this.direction = res?.data?.business_address?.fullAddress
          this.latitude = res?.data?.business_address?.latitude
          this.longitude = res?.data?.business_address?.longitude
          this.zipcode = res?.data?.business_address?.zip
          this.state = res?.data?.business_address?.state
          this.city = res?.data?.business_address?.city
          this.country = res?.data?.business_address?.country
          this.businessLogoUrl = res?.data?.company_logo
          if (res?.data?.services_offered.length) {
            this.services = res?.data?.services_offered
          }
          if (res?.data?.gallery_images.length) {
            this.imagePreviews = res?.data?.gallery_images
          }

          if (res?.data?.business_hours) {
            let businessHours = this.parse(res?.data?.business_hours)
            // this.showTimeTable = true;
            let selectedTimeZone = this.changeTimeZoneFormat(
              businessHours.pop(),
            )
            if (selectedTimeZone) {
              this.selectedData = selectedTimeZone
            }
            const hours = this.combineMultipleTime(businessHours)
              .flat()
              ?.map((item: any) => [item])
            const formattedDays = hours?.map((day: any) => {
              const value = day?.map((item: any) => item)?.[0]?.split(' ')
              const times = value[1]?.split(',')
              return {
                name: value?.[0],
                times: times?.map((time: string) => {
                  return {
                    start: time?.split('-')?.[0] || '',
                    end: time?.split('-')?.[1] || '',
                  }
                }),
              }
            })
            this.days?.forEach((day) => {
              formattedDays?.forEach((newDay: any) => {
                if (day?.name === newDay?.name) {
                  day.times = newDay?.times
                }
              })
            })
          }
        },
      })
  }
}
