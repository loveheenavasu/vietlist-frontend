import { Output, EventEmitter, ChangeDetectorRef } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthenticationService, LocalStorageService } from '@vietlist/shared'
import { DndDropEvent, DndModule } from 'ngx-drag-drop'
import { NgxDropzoneModule } from 'ngx-dropzone'
import Swal from 'sweetalert2'
import { BusinessService } from '../../service/business.service'
import { LoaderComponent } from 'src/app/common-ui'

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [
    DndModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    LoaderComponent,
  ],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent {
  public verified_badge: any
  public verification_upload: any = []
  public lastPart!: string
  public check!: boolean
  public imagePreviews: any
  public imageUrl: any
  public filess: any
  public businessFormDetails: any
  public isImageUploading: boolean = false

  @Output() formSubmit = new EventEmitter<void>()
  @Input() set subscriptionData(value: any) {
    this.businessFormDetails = value || undefined
    this.verified_badge = value?.verified_badge
    if (this.verified_badge == '1') {
      this.check = true
    } else {
      this.check = false
    }
    this.verification_upload = value?.verification_upload
    const parts: string[] = this.verification_upload
    this.lastPart = parts?.[parts?.length - 1]

    this.cdr.detectChanges()
    this.subscriptionForm?.patchValue({
      facebook: value?.facebook,
      instagram: value?.instagram,
      twitter: value?.twitter,
      linkedin: value?.linkedin,
      youtube: value?.youtube,
      pinterest: value?.pinterest,
      snapchat: value?.snapchat,
      tiktok: value?.tiktok,
      whatsapp: value?.whatsapp,
      reddit: value?.reddit,
    })
  }
  public checkdvalue: any
  public document: any
  public isFormFilled: boolean = false
  public isLoader: boolean = false
  public title = 'dropzone'
  public files: File[] = []
  public verifiedBadge = new FormControl(false)
  public subscriptionForm: FormGroup
  public filesString: any
  public postId: any
  changeBadgetext!: boolean
  hidefileds: any
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private localstorage: LocalStorageService,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,
  ) {
    this.subscriptionForm = this.fb.group({
      facebook: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      twitter: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      instagram: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],

      tiktok: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],

      youtube: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      whatsapp: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      reddit: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      snapchat: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      linkedin: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
      pinterest: [
        '',
        [
          Validators.pattern(
            /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
          ),
        ],
      ],
    })
    this.authService.userDetails.subscribe((res: any) => {
      this.hidefileds = res
    })
    const id = localstorage.getData('postId')
    this.postId = Number(id)

    this.businessService.isSubscriptionFormFilled.subscribe((res) => {
      this.isFormFilled = res
    })

    const isFormFIlled = this.localstorage.getData('isSubscriptionFormFilled')
    this.isFormFilled = Boolean(isFormFIlled)
  }

  ngOnInit() {}

  onSelectImage(event: any) {
    this.files = [...event.addedFiles]

    const formData = new FormData()

    for (var i = 0; i < this.files.length; i++) {
      console.log(this.files[i], 'this.files[i]')
      formData.append('file[]', this.files[i])
    }
    this.displayImagePreviews()
  }

  displayImagePreviews() {
    this.isImageUploading = true
    this.imagePreviews = []
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
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

  public getSafeURL(file: File): any {
    return URL.createObjectURL(file)
  }

  public addBusiness() {
    // window.location.reload()
    this.isLoader = true
    const body = {
      post_id: this.postId,
      facebook: this.subscriptionForm.value.facebook,
      twitter: this.subscriptionForm.value.twitter,
      instagram: this.subscriptionForm.value.instagram,
      youtube: this.subscriptionForm.value.youtube,
      linkedin: this.subscriptionForm.value.linkedin,
      snapchat: this.subscriptionForm.value.snapchat,
      tiktok: this.subscriptionForm.value.tiktok,
      pinterest: this.subscriptionForm.value.pinterest,
      reddit: this.subscriptionForm.value.reddit,
      whatsapp: this.subscriptionForm.value.whatsapp,
      verification_upload: this.imageUrl,
      verified_badge: this.verifiedBadge.value ? 1 : 0,
    }
    if (this.isFormFilled) {
      this.businessService.updateBusiness(body).subscribe({
        next: (res) => {
          this.isLoader = false
          if (res) {
            this.formSubmit.emit()
            // Swal.fire({
            //   toast: true,
            //   text: 'Successfully updated subscription details.',
            //   animation: false,
            //   icon: 'success',
            //   position: 'top-right',
            //   showConfirmButton: false,
            //   timer: 10000,
            //   timerProgressBar: true,
            // })
          }
        },
        error: (err) => {},
      })
    } else {
      this.businessService.addBusiness(body).subscribe({
        next: (res) => {
          if (res) {
            this.isLoader = false
            this.businessService.isSubscriptionFormFilled.next(true)
            this.localstorage.saveData('isSubscriptionFormFilled', 'true')
            this.isFormFilled = true
            this.formSubmit.emit()
          }
        },
        error: (err) => {},
      })
    }
  }
}
