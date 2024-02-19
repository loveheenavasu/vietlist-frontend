import { filter } from 'rxjs';
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
    console.log(value);
    this.imagePreviews = value.image
    // const video: HTMLVideoElement = document.createElement('video')
    // // video.src = videoUrl
    // video.src = value.video_upload
    this.video_upload = value?.video_upload || [];
    
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
  public video_upload: any[] = [];
  public daysName: any
  public vediosUrl: any[] = [];
  public startTime: any
  public endTime: any
  public jsonString: any
  public title = 'dropzone'
  public clearTable = false
  public files: File[] = []
  public imagePreviews: any
  public imageUrl: any
  public showTimeTable: boolean = false
  public ConsultationForm!: FormGroup
  public isLoader: boolean = false
  public postId: any
  public formattedData!: any[]
  public selectedData: any
  public selectedTimeZone: any
  public isFormFilled: boolean = false
  public filess: any
  public Timezone: {
    region: string
    timeZones: { country: string; offset: string }[]
  }[] = []
public isVideoUploading:boolean = false
public isImageUploading:boolean = false
  public timeZones: {
    region: string
    zones: { name: string; offset: string }[]
  }[] = []
  public selectedWeek: string[] = []
  public isLastRemoved: boolean[] = []
  public imageUrlsArr:any[]=[]


/**
 * 
 * @param http 
 * @param renderer 
 * @param fb 
 * @param businessService 
 * @param router 
 * @param localstorage 
 */
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private localstorage: LocalStorageService,
  ) {
    const timeZoneNames = moment.tz.names()

    timeZoneNames.forEach((timeZone) => {
      const country = timeZone.split('/')[0]
      const region = timeZone.split('/')[0].replace(/_/g, ' ')
      const utcOffset = moment.tz(timeZone).utcOffset()

      let regionObject = this.Timezone.find((item) => item.region === region)
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
  }//end constrctor 


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
    this.selectedTimeZone = event
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target) {
      this.select.filter(target.value)
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
            this.video_upload = [...this.video_upload, res.image_url]
            console.log(this.video_upload)
            this.vediosUrl = [...this.vediosUrl, res.image_url]
          },
          error: (err: any) => {
            // Handle errors
          },
        })
        // video.controls = true // Add controls to the video element
        // video.width = 320 // Set the width of the video element
        // video.height = 240 // Set the height of the video element
        // video.style.cssText = `
        // margin:10px; 
        // object-fit:cover;
        // `
        // // Create the video container
        // const videoElement = document.createElement('div')
        // videoElement.classList.add('video-preview') // Add a class for styling purposes

        // // Create remove button
        // const removeButton = document.createElement('button')
        // removeButton.classList.add('remove_button')
        // removeButton.textContent = 'Remove'
        // removeButton.style.cssText = `
        // background: orange;
        // display: block;
        // width: 94.7%;
        // margin: auto;
        // color: #fff;
        // border: 0;
        // margin-top: -12px;
        //   `

        // removeButton.addEventListener('click', () => {
        //   this.onRemove(videoElement)
        // })

        // videoElement.appendChild(video)
        // videoElement.appendChild(removeButton)

        // // Get the video container element
        // const videoContainer = document.getElementById(
        //   'video-preview-container',
        // )

        // // Ensure that the video container exists before appending the video element
        // if (videoContainer) {
        //   videoContainer.appendChild(videoElement)
        // } else {
        //   console.error('Video preview container not found.')
        // }
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
    this.files = [...event.addedFiles]
    this.displayImagePreviews()
  }

  displayImagePreviews() {
    this.isImageUploading = true
    // Assuming you have an array to store image URLs for preview
    this.imagePreviews = [...this.imagePreviews];

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
        this.isImageUploading = false
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
    this.isLoader = true
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
      business_hours: businessHours,
      special_offers: this.ConsultationForm.value.special_offers,
      video_upload: this.vediosUrl?.filter((item: any) => item ? true : false),
      image: this.imagePreviews?.filter((item: any) => item ? true : false)
    }
    if (!this.isFormFilled) {
      this.businessService.addBusiness(body).subscribe({
        next: (res: any) => {
          this.isLoader = false
          if (res) {
            this.isLoader = false
            this.consultationFormSubmit.emit()
            this.localstorage.saveData('isConsultationFormFilled', 'true')
            this.businessService.isConsultationFormFilled.next(true)
            this.isFormFilled = true
          }
        },
        error:(err)=>{
          this.isLoader = false
        }
      })
    } else if (this.isFormFilled) {
      this.businessService.updateBusiness(body).subscribe({
        next: (res) => {
          this.isLoader = false
          this.consultationFormSubmit.emit()
          this.localstorage.saveData('isConsultationFormFilled', 'true')
          this.businessService.isConsultationFormFilled.next(true)
          this.isFormFilled = true
        },
        error:(err)=>{
          this.isLoader = false
        }
      })
    }
  }
}
