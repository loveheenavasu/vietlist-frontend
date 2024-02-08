import { NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LocalStorageService } from '@vietlist/shared'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { BusinessService } from '../../service/business.service'

@Component({
  selector: 'app-business-bio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, LoaderComponent],
  templateUrl: './business-bio.component.html',
  styleUrl: './business-bio.component.scss',
})
export class BusinessBioComponent {
  @Output() buinessFormSubmit = new EventEmitter<void>()
  @Input() set businessbioData(value: any) {
    const controls = ['owner_name', 'business_historybackground', 'mission__vision']

    controls.forEach((control) => {
      this.businessBioForm.get(control)?.patchValue(value?.[control] || '')
    })
  }
  public businessBioForm!: FormGroup
  public isLoader: boolean = false
  public postId: any
  public isFormFilled:boolean = false
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router,
    private localstorage: LocalStorageService,
  ) {
    this.businessBioForm = this.fb.group({
      owner_name: ['', Validators.required],
      business_historybackground: [''],
      mission__vision: [''],
    })
    const id = localstorage.getData('postId')
    this.postId = Number(id)

    this.businessService.isBusinessBioFormFilled.subscribe((res)=>{
      this.isFormFilled = res
    })

    const isFormFIlled = this.localstorage.getData("isBusinessBioFormFilled")
     this.isFormFilled = Boolean(isFormFIlled)

  }

  ngOnInit() {
    console.log(this.postId)
  }

  public addBusiness() {
    this.isLoader = true
    const body = {
      post_id: this.postId,
      owner_name: this.businessBioForm.value.owner_name,
      business_historybackground:
        this.businessBioForm.value.business_historybackground,
      mission__vision: this.businessBioForm.value.mission__vision,
    }
    if(this.isFormFilled){
      this.businessService.updateBusiness(body).subscribe({
        next: (res) => {
          if (res) {
            this.isLoader = false
            this.buinessFormSubmit.emit()
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
        error:(err)=>{

        }
      })
    }
    this.businessService.addBusiness(body).subscribe({
      next: (res) => {
        if (res) {
          this.isLoader = false
          
          this.buinessFormSubmit.emit()
          this.businessService.isBusinessBioFormFilled.next(true)
          this.localstorage.saveData("isBusinessBioFormFilled" , "true")
          this.isFormFilled = true
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
      error:(err)=>{
        
      }
    })
  }
}
