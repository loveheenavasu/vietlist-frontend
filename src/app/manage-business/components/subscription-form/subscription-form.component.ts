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
import { LocalStorageService } from '@vietlist/shared'
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
  public verification_upload: any
  public lastPart!: string
  public check!: boolean
  public imagePreviews: any
  public imageUrl: any
  public filess: any
  public businessFormDetails: any
  public isImageUploading:boolean = false

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
    const parts: string[] = this.verification_upload?.split('/')
    this.lastPart = parts?.[parts?.length - 1]

    this.cdr.detectChanges()
    this.subscriptionForm?.patchValue({
      facebook: value?.facebook,
      instagram: value?.instagram,
      twitter: value?.twitter,
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
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private localstorage: LocalStorageService,
    private cdr: ChangeDetectorRef,
  ) {
    this.subscriptionForm = this.fb.group({
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      instagram: ['', Validators.required],
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
        const result = reader.result as string
      }
    }
    console.log(this.files[0], 'files[0]')
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
    this.isLoader = true
    const body = {
      post_id: this.postId,
      facebook: this.subscriptionForm.value.facebook,
      twitter: this.subscriptionForm.value.twitter,
      instagram: this.subscriptionForm.value.instagram,
      verification_upload: this.imageUrl,
      verified_badge: this.verifiedBadge.value ? 1 : 0,
    }
    if (this.isFormFilled) {
      this.businessService.updateBusiness(body).subscribe({
        next: (res) => {
          this.isLoader = false
          this.formSubmit.emit()
          // Swal.fire({
          //   toast: true,
          //   text: 'Successfully updated subscription details.',
          //   animation: false,
          //   icon: 'success',
          //   position: 'top-right',
          //   showConfirmButton: false,
          //   timer: 3000,
          //   timerProgressBar: true,
          // })
        },
        error: (err) => {},
      })
    } else {
      this.businessService.addBusiness(body).subscribe({
        next: (res) => {
          if (res) {
            this.isLoader = false
            this.formSubmit.emit()
            this.businessService.isSubscriptionFormFilled.next(true)
            this.localstorage.saveData('isSubscriptionFormFilled', 'true')
            this.isFormFilled = true
            // Swal.fire({
            //   toast: true,
            //   text: 'Successfully added subscription details.',
            //   animation: false,
            //   icon: 'success',
            //   position: 'top-right',
            //   showConfirmButton: false,
            //   timer: 3000,
            //   timerProgressBar: true,
            // })
          }
        },
        error: (err) => {},
      })
    }
  }
}
