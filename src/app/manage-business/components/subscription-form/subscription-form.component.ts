import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [
    DndModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent {
  title = 'dropzone'
  files: File[] = []
  @Input() postId: any
  public verifiedBadge = new FormControl(false)
  public subscriptionForm: FormGroup
  public filesString:any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private businessService: BusinessService,
    public localStorageService:LocalStorageService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.subscriptionForm = this.fb.group({
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      instagram: ['', Validators.required],
    })
  
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

  ngOnInit(){
    this.route.params.subscribe((params:any) => {
      this.postId = params['id']
    })
  }

  onSelect(event: any) {
    console.log(event.addedFiles)
    this.files.push(...event.addedFiles)
    const filesString = this.files.map((file) => file.name).join(', ')
    console.log(filesString)

    console.log(this.files)
  }

  onRemove(event: any) {
    console.log(event)
    this.files.splice(this.files.indexOf(event), 1)
  }

  getSafeURL(file: File): any {
    return URL.createObjectURL(file)
  }


  addBusiness() {
    const body = {
      post_id: this.postId,
      facebook: this.subscriptionForm.value.facebook,
      twitter: this.subscriptionForm.value.twitter,
      instagram: this.subscriptionForm.value.instagram,
      verification_upload:this.filesString,
    }
    this.businessService.addBusiness(body).subscribe({
      next: (res) => {
      this.router.navigate(['/list-business/'])
      },
    })
  }
}
