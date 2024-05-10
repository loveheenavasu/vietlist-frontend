import { filter } from 'rxjs'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxDropzoneModule } from 'ngx-dropzone'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import Swal from 'sweetalert2'
import { BusinessService } from '../../service/business.service'
import { AuthenticationService, LocalStorageService } from '@vietlist/shared'
import { LoaderComponent } from 'src/app/common-ui'
import { CommonModule } from '@angular/common'
// import * as moment from 'moment-timezone'
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select'
import { Router } from '@angular/router'
// import moment from 'moment';
import moment from 'moment-timezone'
@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatRadioModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    CommonModule,
    NgSelectModule,
  ],
  templateUrl: './consultation-form.component.html',
  styleUrl: './consultation-form.component.scss',
})
export class ConsultationFormComponent {
  @ViewChild('uiContainer') uiContainer!: ElementRef
  @Output() consultationFormSubmit = new EventEmitter<void>()
  @Input() set consultationData(value: any) {
    this.imagePreviews = value?.image || []
    this.video_upload = value?.video_upload || []
    const Gethours = value?.business_hours
    if (Gethours == 'false') {
      this.showTimeTable = false
    } else {
      this.showTimeTable = true
    }

    // console.log(value?.business_hours)
    // console.log(JSON.parse(value?.business_hours))

    let businessHours = this.parse(value?.business_hours)
    // this.showTimeTable = true;
    let selectedTimeZone = this.changeTimeZoneFormat(businessHours.pop())
    if (selectedTimeZone) {
      this.selectedData = selectedTimeZone
    }

    const hours = businessHours.flat()?.map((item: any) => [item])

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
    console.log(formattedDays, 'formattedDays')

    this.days?.forEach((day) => {
      formattedDays?.forEach((newDay: any) => {
        if (day?.name === newDay?.name) {
          day.times = newDay?.times
        }
      })
    })

    const controls = [
      'consultation_booking_link',
      'consultation_mode',
      'consultation_description',
      'special_offers',
      'services_list',
      'price',
      'video_url',
      'business_hours',
    ]

    controls.forEach((control) => {
      this.ConsultationForm.get(control)?.patchValue(value?.[control] || '')
    })
  }
  @ViewChild('select') select!: NgSelectComponent
  public searchTerm: string = ''
  public video_upload: any = []
  public daysName: any
  public vediosUrl: any[] = []
  public startTime: any
  public endTime: any
  public jsonString: any
  public title = 'dropzone'
  public clearTable = false
  public files: File[] = []
  public imagePreviews: any[] = []
  public imageUrl: any
  public showTimeTable: boolean = false
  public ConsultationForm!: FormGroup
  public isLoader: boolean = false
  public postId: any
  public formattedData!: any[]
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
  public days = [
    { name: 'Mo', times: [{ start: '', end: '' }] },
    { name: 'Tu', times: [{ start: '', end: '' }] },
    { name: 'We', times: [{ start: '', end: '' }] },
    { name: 'Th', times: [{ start: '', end: '' }] },
    { name: 'Fr', times: [{ start: '', end: '' }] },
    { name: 'Sa', times: [{ start: '', end: '' }] },
    { name: 'Su', times: [{ start: '', end: '' }] },
  ]

  /**
   *
   * @param http
   * @param renderer
   * @param fb
   * @param businessService
   * @param router
   * @param localstorage
   */
  vediosHide: any
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private localstorage: LocalStorageService,
    private authService: AuthenticationService,
  ) {
    // Now, you can use timezone-related functions safely
    const timeZoneNames = moment?.tz?.names()
    this.authService.userDetails.subscribe((res: any) => {
      if (res) {
        this.vediosHide = res
      }
    })
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
    this.ConsultationForm = this.fb.group({
      consultation_booking_link: [
        '',
        Validators.pattern(
          /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
        ),
      ],
      consultation_mode: [''],
      consultation_description: ['', [Validators.maxLength(254)]],
      services_list: ['', [Validators.maxLength(254)]],
      price: [''],
      video_url: [
        '',
        Validators.pattern(
          /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
        ),
      ],
      business_hours: [''],
      special_offers: ['', Validators.required],
    })
    const id = localstorage.getData('postId')
    this.postId = Number(id)
    this.formatData()

    this.businessService.isConsultationFormFilled.subscribe((res) => {
      this.isFormFilled = res
    })

    const localData = this.localstorage.getData('isConsultationFormFilled')
    this.isFormFilled = Boolean(localData)
  }

  ngAfterViewInit() {
    this.addData()
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

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target) {
      this.select.filter(target.value)
    }
  }

  onChange(time: any, difTime: any, dayName: any) {
    if (time == '00:00' && difTime == '00:00') {
      this.selectedWeek = this.selectedWeek.filter((day) => day !== dayName)
    } else if (!this.selectedWeek.includes(dayName)) {
      this.selectedWeek.push(dayName)
    }
  }

  onSelect(event: any) {
    const files: File[] = event.addedFiles
    this.filess = files

    const videoFiles: File[] = files.filter((file) =>
      file.type.startsWith('video/'),
    )

    // If there are any image files, you can remove them
    const imageFiles: File[] = files.filter((file) =>
      file.type.startsWith('image/'),
    )
    if (imageFiles.length > 0) {
      // Handle the presence of image files (disable or display a message)
      Swal.fire({
        toast: true,
        text: 'Image files are not allowed. Please upload only video files.',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      console.log(
        'Image files are not allowed. Please upload only video files.',
      )
    }

    // Handle the uploaded video files
    videoFiles.forEach((file) => {
      const reader = new FileReader()
      this.isVideoUploading = true
      reader.onload = () => {
        const videoUrl = reader.result as string
        // const video: HTMLVideoElement = document.createElement('video')
        // this.video_upload = video.src
        this.businessService.uploadMedia(this.filess[0]).subscribe({
          next: (res: any) => {
            this.isVideoUploading = false
            //   if (this.video_upload && this.video_upload.length > 0) {
            //     this.video_upload.shift(); // Remove the element at index 0
            // }

            // // Append res.image_url to the video_upload array
            // if (res.image_url) {
            //     this.video_upload = [...this.video_upload, res.image_url];
            // }
            this.video_upload = [res.image_url]

            this.vediosUrl = [...this.vediosUrl, res.image_url]
          },
          error: (err: any) => {
            // Handle errors
            this.isVideoUploading = false
          },
        })
      }
      reader.readAsDataURL(file)
    })
  }
  removeItems(index: any) {
    this.video_upload.splice(index, 1)
  }
  onRemove(videoElement: HTMLElement) {
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement)
    }
  }
  // public onRemove() {
  //   console.log(this.videoContainer)
  //   this.videoContainer.splice(this.videoContainer.indexOf(this.videoContainer), 1)
  // }
  onSelectImage(event: any) {
    this.files = [...event.addedFiles]
    //  console.log( this.files,' this.files this.files this.files')
    if (this.vediosHide.level_id == '1') {
      if (this.files.length > 5) {
        console.log('upload 5 images ')
        Swal.fire({
          toast: true,
          text: 'You can upload only 5 images',
          animation: false,
          icon: 'error',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        return
      }
    }
    if (this.vediosHide.level_id == '2') {
      if (this.files.length > 20) {
        console.log('upload 20 images ')
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
    }
    this.displayImagePreviews()
  }

  displayImagePreviews() {
    let maxImages: any
    switch (this.vediosHide.level_id) {
      case '2':
        maxImages = 20
        break
      case '3':
      default:
        maxImages = Infinity
        break
    }

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
          if (
            this.imagePreviews.length >= maxImages &&
            this.vediosHide.level_id !== '3'
          ) {
            this.isImageUploading = false
          }
        },
        error: (err: any) => {
          this.isImageUploading = false
        },
      })
    })
  }

  public removeItem(index: any) {
    this.imagePreviews.splice(index, 1)
  }

  public addTime(dayIndex: number) {
    this.days[dayIndex].times.push({ start: '', end: '' })
  }

  onWeekSelect(dayName: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked

    if (checked) {
      this.pushDay(dayName)
      // this.selectedWeek.push(dayName)
    } else {
      this.selectedWeek = this.selectedWeek.filter((day) => day !== dayName)
    }
    this.currentSelectedWeek = [...this.selectedWeek]
  }

  onSubmit() {}

  public removeTime(dayIndex: number, timeIndex: number) {
    this.days[dayIndex].times.splice(timeIndex, 1)
    this.isLastRemoved[dayIndex] = this.days[dayIndex].times.length === 0
  }

  pushDay(day: any) {
    if (!this.selectedWeek.includes(day)) {
      this.selectedWeek.push(day)
    }
  }

  checkHours(day: any) {
    let { times } = day
    if (!times[0].start && !times[0].end) {
      return false
    }
    if (times[0].start === times[0].end) {
      this.pushDay(day?.name)
      return true
    } else {
      this.pushDay(day?.name)
      return false
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

  public addBusiness(): void {
    this.isLoader = true
    const selectedDaysData = this.days.filter((day) =>
      this.currentSelectedWeek.includes(day.name),
    )
    console.log(this.currentSelectedWeek, 'this.selectedWeek')
    console.log(selectedDaysData, 'selectedDaysData')

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

    // const resultArray = Object.keys(jsonData).map(day => `${day} ${jsonData[day].join(', ')}`);
    const resultArray = this.currentSelectedWeek.map((day) => {
      const times = jsonData[day] ? jsonData[day].join(',') : ''
      return `${day} ${times}`
    })
    console.log(resultArray, 'resultArray')

    const selectedData = this.formatTimezone([this.selectedData])
    let businessHours = null
    if (selectedData?.length || resultArray?.length) {
      if (selectedData?.length) {
        businessHours = `${JSON.stringify(resultArray)},${selectedData}`
      } else {
        businessHours = `${JSON.stringify(resultArray)},[]`
      }
    }
    console.log(selectedData, resultArray, 'lplplplplpl')
    console.log(this.selectedData, 'polplplplplpl')

    this.isLoader = true
    const body = {
      post_id: this.postId,
      consultation_booking_link:
        this.ConsultationForm.value.consultation_booking_link,
      consultation_mode: this.ConsultationForm.value.consultation_mode,
      consultation_description:
        this.ConsultationForm.value.consultation_description,
      services_list: this.ConsultationForm.value.services_list,
      price: this.ConsultationForm.value.price,
      video_url: this.ConsultationForm.value.video_url,
      business_hours: !this.showTimeTable ? 'false' : businessHours,
      special_offers: this.ConsultationForm.value.special_offers,
      video_upload:
        this.vediosUrl && this.vediosUrl.length > 0
          ? this.vediosUrl.filter((item: any) => (item ? true : false))
          : null,
      image:
        this.imagePreviews && this.imagePreviews.length > 0
          ? this.imagePreviews.filter((item: any) => (item ? true : false))
          : null,
    }
    if (!this.isFormFilled) {
      this.businessService.addBusiness(body).subscribe({
        next: (res: any) => {
          this.consultationFormSubmit.emit()
          this.isLoader = false
          if (res) {
            this.consultationFormSubmit.emit()
            this.isLoader = false
            this.localstorage.saveData('isConsultationFormFilled', 'true')
            this.businessService.isConsultationFormFilled.next(true)
            this.isFormFilled = true
          }
        },
        error: (err) => {
          this.isLoader = false
        },
      })
    } else if (this.isFormFilled) {
      this.businessService.updateBusiness(body).subscribe({
        next: (res) => {
          this.isLoader = false

          this.consultationFormSubmit.emit()
          if (res) {
            this.consultationFormSubmit.emit()
            this.localstorage.saveData('isConsultationFormFilled', 'true')
            this.businessService.isConsultationFormFilled.next(true)
            this.isFormFilled = true
          }
        },
        error: (err) => {
          this.isLoader = false
        },
      })
    }
  }
}
