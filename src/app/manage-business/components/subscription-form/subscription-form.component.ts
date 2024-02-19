import { Output, EventEmitter, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgFor, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
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
  verified_badge: any
  verification_upload: any
  lastPart!: string
  check!: boolean
  @Output() formSubmit = new EventEmitter<void>()
  @Input() set subscriptionData(value: any) {
    console.log(value)
    this.verified_badge = value?.verified_badge
    if (this.verified_badge == '1') {
      console.log('trueeee')
      this.check = true
    } else {
      console.log('trueeee2')
      this.check = false
    }
    this.verification_upload = value?.verification_upload
    const parts: string[] = this.verification_upload?.split('/')
    this.lastPart = parts?.[parts?.length - 1]

    this.cdr.detectChanges()
    this.subscriptionForm?.patchValue({
      facebook: value?.facebook,
      instagram: value?.instagram,
      twitter: value?.twitter
    })
  } 
  checkdvalue: any
  document: any
  public isFormFilled: boolean = false
  public isLoader: boolean = false
  title = 'dropzone'
  files: File[] = []
  public verifiedBadge = new FormControl(false)
  public subscriptionForm: FormGroup
  public filesString: any
  public postId: any
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router,
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

  // onSelect(event: any) {
  //   console.log(event.addedFiles)
  //   this.files.push(...event.addedFiles)

  //   const formData = new FormData()

  //   for (var i = 0; i < this.files.length; i++) {
  //     formData.append('file[]', this.files[i])
  //   }

  // }

  // onRemove(event: any) {
  //   console.log(event)
  //   this.files.splice(this.files.indexOf(event), 1)
  // }
  ngOnInit() {}

  public onSelect(event: any) {
    console.log(event.addedFiles)
    this.files.push(...event.addedFiles)
    this.filesString = this.files.map((file) => file.name).join(', ')
    console.log(this.filesString)

    console.log(this.files)

    if (event.addedFiles.length > 1) {
      Swal.fire({
        toast: true,
        text: 'You can only upload one file.',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      this.files.push(...event.addedFiles)
      this.filesString = this.files.map((file) => file.name).join(', ')
      // this.isFilesPresent = true;
      const file = event.addedFiles[0]
      this.businessService.uploadMedia(this.files[0]).subscribe({
        next: (res: any) => {
          this.document = res.image_url
          this.verification_upload = res.image_url
          const parts: string[] = this.verification_upload.split('/')
          this.lastPart = parts[parts.length - 1]
        },
        error: (err: any) => {
          // Handle errors
        },
      })
    }
  }

  public onRemove(event: any) {
    console.log(event)
    this.files.splice(this.files.indexOf(event), 1)
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
      verification_upload: this.document,
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
