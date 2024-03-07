import { LoaderComponent } from 'src/app/common-ui'
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
import { AuthenticationService, LocalStorageService } from '@vietlist/shared'
import { EventService } from 'src/app/manage-event/service/event.service'

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
    LoaderComponent,
  ],
  templateUrl: './promotions-form.component.html',
  styleUrl: './promotions-form.component.scss',
})
export class PromotionsFormComponent {
  @Output() promotionFormSubmit = new EventEmitter<void>()
  public title = 'dropzone'
  public files: File[] = []
  public imagePreviews: any[] = []
  public imageUrl: any
  public filess: any
  public vediosUrl: any
  public term_and_condition = new FormControl('')
  public promotions: FormGroup
  public video_upload: any
  public recaptcha = new FormControl('')
  public isLoader: boolean = false
  public isImageUploading: boolean = false
  public eventsArray: any[] = []
  public postId: any
  public eliteUserOnly?: any
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private localstorage: LocalStorageService,
    private eventService: EventService,
    private authService: AuthenticationService
  ) {
    this.promotions = this.fb.group({
      createEvent: [''],
      faq: [''],
      physical_accessibility: [''],
      digital_accessibility: [''],
      upload_certificates: [''],
      business_ownerassociate: [''],
      choose_layout: [''],
      event_id: [''],
      promotions_field: ['']
    })
    this.authService.userDetails.subscribe((res: any) => {
      this.eliteUserOnly = res

    })

    const id = localstorage.getData('postId')
    this.postId = Number(id)
  }


  ngOnInit() {
    this.getAddedEvents()
  }

  onSelectImage(event: any) {
    this.files = [...event.addedFiles]
    this.displayImagePreviews()
  }

  displayImagePreviews() {
    this.isImageUploading = true
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

  public resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`)
  }


  public getAddedEvents() {

    this.eventService.getEventsByUserId().subscribe({
      next: (res: any) => {
        this.eventsArray = res.data

      },
      error: (err) => {

      }
    })
  }

  public handleFinalSubmission() {
    this.isLoader = true
    const body = {
      post_id: this.postId,
      faq: this.promotions.value.faq,
      upload_certificates: this.imagePreviews,
      physical_accessibility: this.promotions.value.physical_accessibility,
      digital_accessibility: this.promotions.value.digital_accessibility,
      choose_layout: this.promotions.value.choose_layout,
      terms_conditions: this.term_and_condition.value,
      final_submission: 1,
      promotions_field: this.promotions.value.promotions_field,
      createEvent: this.promotions.value.createEvent ? 1 : 0,
      business_ownerassociate: this.promotions.value.business_ownerassociate
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
