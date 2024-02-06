import { Output, EventEmitter } from '@angular/core'
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
    LoaderComponent
  ],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent {
  @Output() formSubmit = new EventEmitter<void>()
  @Input() set subscriptionData(value: any) {
    const controls = ['facebook', 'twitter', 'instagram']

    controls.forEach((control) => {
      this.subscriptionForm.get(control)?.patchValue(value?.[control] || '')
    })
  }
  public isLoader:boolean = false
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
  ) {
    this.subscriptionForm = this.fb.group({
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      instagram: ['', Validators.required],
    })
    const id = localstorage.getData('postId')
    this.postId = Number(id)
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
  ngOnInit() {
 
  }


  public onSelect(event: any) {
    console.log(event.addedFiles)
    this.files.push(...event.addedFiles)
    const filesString = this.files.map((file) => file.name).join(', ')
    console.log(filesString)

    console.log(this.files)
  }

 public  onRemove(event: any) {
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
      verification_upload: this.filesString,
    }
    this.businessService.addBusiness(body).subscribe({
      next: (res) => {
        if (res) {
          this.isLoader= false
          this.formSubmit.emit()
          Swal.fire({
            toast: true,
            text: 'Successfully added subscription details.',
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
