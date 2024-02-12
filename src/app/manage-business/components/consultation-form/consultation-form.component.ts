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
import { LocalStorageService } from '@vietlist/shared'
import { LoaderComponent } from 'src/app/common-ui'
import { CommonModule } from '@angular/common'
import * as moment from 'moment-timezone'
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select'
import { Router } from '@angular/router'
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
    this.imagePreviews = value.image
    const video: HTMLVideoElement = document.createElement('video')
    // video.src = videoUrl
    video.src = value.video_upload
    this.video_upload = value.video_upload
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
  searchTerm: string = ''
  video_upload: any
  daysName: any
  vediosUrl: any
  startTime: any
  endTime: any
  jsonString: any
  title = 'dropzone'
  clearTable = false
  files: File[] = []
  imagePreviews: any
  imageUrl: any
  showTimeTable: boolean = false
  public ConsultationForm!: FormGroup
  public isLoader: boolean = false
  postId: any
  formattedData!: any[]
  selectedData: any
  selectedTimeZone: any
  public isFormFilled: boolean = false
  // Timezone :string[] =[]
  Timezone: {
    region: string
    timeZones: { country: string; offset: string }[]
  }[] = []

  timeZones: { region: string; zones: { name: string; offset: string }[] }[] =
    []

  isLastRemoved: boolean[] = []
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private localstorage: LocalStorageService,
  ) {
    const timeZoneNames = moment.tz.names()

    // Define Timezone as an array of objects

    // Your code to populate Timezone array
    timeZoneNames.forEach((timeZone) => {
      const country = timeZone.split('/')[0] // Extract country name
      const region = timeZone.split('/')[0].replace(/_/g, ' ') // Extract region name, replacing underscores with spaces
      const utcOffset = moment.tz(timeZone).utcOffset()

      // Find or create the region in the Timezone array
      let regionObject = this.Timezone.find((item) => item.region === region)
      if (!regionObject) {
        regionObject = { region: region, timeZones: [] }
        this.Timezone.push(regionObject)
      }

      // Calculate the UTC offset in the format UTC+/-HH:MM
      const hours = Math.floor(Math.abs(utcOffset) / 60)
      const minutes = Math.abs(utcOffset) % 60
      const offsetString = `UTC${utcOffset >= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      regionObject.timeZones.push({ country: country, offset: offsetString })
    })

    this.isLastRemoved = new Array<boolean>(this.days.length).fill(false)
    this.ConsultationForm = this.fb.group({
      consultation_booking_link: [''],
      consultation_mode: [''],
      consultation_description: [''],
      services_list: [''],
      price: [''],
      video_url: [''],
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

  formatData() {
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

  onTimeZoneChange(event: any) {
    this.selectedTimeZone = event // Update selectedTimeZone with the selected time zone
  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target) {
      this.select.filter(target.value)
    }
  }
  filess: any
  onSelect(event: any) {
    const files: File[] = event.addedFiles
    this.filess = files
    // Filter out only video files
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

      reader.onload = () => {
        const videoUrl = reader.result as string

        // Declare the video variable
        const video: HTMLVideoElement = document.createElement('video')
        // video.src = videoUrl
        this.video_upload = video.src
        this.businessService.uploadMedia(this.filess[0]).subscribe({
          next: (res: any) => {
            this.video_upload = res.image_url
            // this.verification_upload = res.image_url
            this.vediosUrl = res.image_url
          },
          error: (err: any) => {
            // Handle errors
          },
        })
        video.controls = true // Add controls to the video element
        video.width = 320 // Set the width of the video element
        video.height = 240 // Set the height of the video element
        video.style.cssText = `
        margin:10px; 
        object-fit:cover;
        `
        // Create the video container
        const videoElement = document.createElement('div')
        videoElement.classList.add('video-preview') // Add a class for styling purposes

        // Create remove button
        const removeButton = document.createElement('button')
        removeButton.classList.add('remove_button')
        removeButton.textContent = 'Remove'
        removeButton.style.cssText = `
  background: orange;
  display: block;
  width: 94.7%;
  margin: auto;
  color: #fff;
  border: 0;
  margin-top: -12px;
`

        removeButton.addEventListener('click', () => {
          this.onRemove(videoElement)
        })

        videoElement.appendChild(video)
        videoElement.appendChild(removeButton)

        // Get the video container element
        const videoContainer = document.getElementById(
          'video-preview-container',
        )

        // Ensure that the video container exists before appending the video element
        if (videoContainer) {
          videoContainer.appendChild(videoElement)
        } else {
          console.error('Video preview container not found.')
        }
      }
      reader.readAsDataURL(file)
    })
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
    this.files.push(...event.addedFiles)

    const formData = new FormData()

    for (var i = 0; i < this.files.length; i++) {
      console.log(this.files[i], 'this.files[i]')
      formData.append('file[]', this.files[i])
    }
    this.displayImagePreviews()
  }
  displayImagePreviews() {
    // Assuming you have an array to store image URLs for preview
    this.imagePreviews = []

    // Loop through each file
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i]
      const reader = new FileReader()

      // Read the file as a data URL
      reader.readAsDataURL(file)

      // Define the onload event handler
      reader.onload = () => {
        // Cast reader.result to string
        const result = reader.result as string

        // Push the data URL (image preview) to the array
        // this.imagePreviews.push(result)
      }
    }
    this.businessService.uploadMedia(this.files[0]).subscribe({
      next: (res: any) => {
        this.imageUrl = res.image_url
        this.imagePreviews.push(res.image_url)
      },
      error: (err: any) => {
        // Handle errors
      },
    })
  }

  public days = [
    { name: 'Mon', times: [{ start: '', end: '' }] },
    { name: 'Tue', times: [{ start: '', end: '' }] },
    { name: 'Wed', times: [{ start: '', end: '' }] },
    { name: 'Thu', times: [{ start: '', end: '' }] },
    { name: 'Fri', times: [{ start: '', end: '' }] },
    { name: 'Sat', times: [{ start: '', end: '' }] },
    { name: 'Sun', times: [{ start: '', end: '' }] },
  ]

  public addTime(dayIndex: number) {
    this.days[dayIndex].times.push({ start: '', end: '' })
  }
  selectedWeek: string[] = []
  onWeekSelect(dayName: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked

    if (checked) {
      this.selectedWeek.push(dayName)
    } else {
      this.selectedWeek = this.selectedWeek.filter((day) => day !== dayName)
    }
  }

  onSubmit() {}

  removeTime(dayIndex: number, timeIndex: number) {
    this.days[dayIndex].times.splice(timeIndex, 1)

    this.isLastRemoved[dayIndex] = this.days[dayIndex].times.length === 0
  }

  public addBusiness(): void {
    const selectedDaysData = this.days.filter((day) =>
      this.selectedWeek.includes(day.name),
    )
    const jsonData: { [key: string]: string[] } = {} // Use an object to group times by day

    selectedDaysData.forEach((day) => {
      day.times.forEach((time) => {
        if (!jsonData[day.name]) {
          jsonData[day.name] = []
        }
        jsonData[day.name].push(`${time.start}-${time.end}`)
      })
    })

    // const resultArray = Object.keys(jsonData).map(day => `${day} ${jsonData[day].join(', ')}`);
    const resultArray = this.selectedWeek.map((day) => {
      const times = jsonData[day] ? jsonData[day].join(', ') : ''
      return `${day} ${times}`
    })
    const selectedData = [this.selectedData]
    // const businessHours = [resultArray, selectedData]; // Modified the way of constructing businessHours array
    const businessHours = JSON.stringify(
      resultArray.map((item) => [item]).concat([selectedData]),
    )

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
      business_hours: businessHours, // Modified to stringify the businessHours array
      special_offers: this.ConsultationForm.value.special_offers,
      video_upload: this.vediosUrl,
      image: this.imageUrl,
      final_submission: 1,
    }
    if (!this.isFormFilled) {
      this.businessService.addBusiness(body).subscribe({
        next: (res: any) => {
          if (res) {
            this.router.navigateByUrl('/manage-profile')
            this.isLoader = false
            this.consultationFormSubmit.emit()
            this.businessService.isBusinessBioFormFilled.next(true)
            this.localstorage.saveData('isConsultationFormFilled', 'true')
            this.businessService.isConsultationFormFilled.next(true)
            this.isFormFilled = true
            this.localstorage.removeData('postId')
            Swal.fire({
              toast: true,
              text: 'Successfully added Business bio details.',
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
          }
        },
      })
    } else if (this.isFormFilled) {
      const updatebody = {
        post_id: this.postId,
        consultation_booking_link:
          this.ConsultationForm.value.consultation_booking_link,
        consultation_mode: this.ConsultationForm.value.consultation_mode,
        consultation_description:
          this.ConsultationForm.value.consultation_description,
        services_list: this.ConsultationForm.value.services_list,
        price: this.ConsultationForm.value.price,
        video_url: this.ConsultationForm.value.video_url,
        business_hours: businessHours, // Modified to stringify the businessHours array
        special_offers: this.ConsultationForm.value.special_offers,
        // video_upload: this.ConsultationForm.value.price,
      }
      this.businessService.updateBusiness(updatebody).subscribe({
        next: (res: any) => {
          if (res) {
            this.router.navigateByUrl('/manage-profile')
            this.isLoader = false
            this.consultationFormSubmit.emit()
            this.businessService.isBusinessBioFormFilled.next(true)
            this.localstorage.saveData('isConsultationFormFilled', 'true')
            this.businessService.isConsultationFormFilled.next(true)
            this.isFormFilled = true
            this.localstorage.removeData('postId')
            Swal.fire({
              toast: true,
              text: 'Successfully updated Business bio details.',
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
          }
        },
      })
    }
  }
}
