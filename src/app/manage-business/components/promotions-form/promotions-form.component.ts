import { LoaderComponent } from 'src/app/common-ui';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Output } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { BusinessService } from '../../service/business.service'
import Swal from 'sweetalert2'
import { NgIf } from '@angular/common'
import { Router } from '@angular/router'
import { LocalStorageService } from '@vietlist/shared'

@Component({
  selector: 'app-promotions-form',
  standalone: true,
  imports: [
    MatCheckboxModule,
    NgxDropzoneModule,
    MatSelectModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    LoaderComponent
  ],
  templateUrl: './promotions-form.component.html',
  styleUrl: './promotions-form.component.scss',
})
export class PromotionsFormComponent {
  @Output() promotionFormSubmit = new EventEmitter<void>()
  public title = 'dropzone'
  public files: File[] = []
  public imagePreviews: any
  public imageUrl: any
  public filess: any
  public vediosUrl: any
  public term_and_condition = new FormControl('')
  public promotions: FormGroup
  public video_upload: any
  public recaptcha = new FormControl('')
  public isLoader:boolean = false
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private localstorage: LocalStorageService,
  ) {
    this.promotions = this.fb.group({
      faq: [''],
      physical_accessibility: [''],
      digital_accessibility: [''],
      choose_layout: [''],
    })
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
  resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`)
  }

  public handleFinalSubmission() {
  this.isLoader = true
    const body = {
      faq: this.promotions.value.faq,
      physical_accessibility: this.promotions.value.physical_accessibility,
      digital_accessibility: this.promotions.value.digital_accessibility,
      choose_layout: this.promotions.value.choose_layout,
      terms_conditions: this.term_and_condition.value,
      final_submission: 1,
    }
    this.businessService.addBusiness(body).subscribe({
      next: (res) => {
        this.isLoader = false
        if (res) {
          Swal.fire({
            toast: true,
            text: 'Your business has been added successfully.',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          this.localstorage.removeData('postId')
          this.localstorage.removeData('isSubscriptionFormFilled')
          this.localstorage.removeData('isBusinessFormFilled')
          this.localstorage.removeData('isBusinessBioFormFilled')
          this.localstorage.removeData('isConsultationFormFilled')
          this.router.navigateByUrl('/manage-profile/my-business')
          this.router.navigateByUrl('/manage-profile/my-business')
        }
      },
    })
  }
}
