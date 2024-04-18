import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DndModule } from 'ngx-drag-drop';
import { Location, NgIf } from '@angular/common';
import { BusinessService } from '../manage-business/service/business.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlValidationDirective } from '../shared/utils';
import { ClaimService } from './claim.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LoaderComponent } from 'src/app/common-ui'
import { EventService } from '../manage-event/service/event.service';
import { scrollToTop } from 'src/app/shared/utils/windowScrolls'
@Component({
  selector: 'app-claim-listing',
  standalone: true,
  imports: [NgxIntlTelInputModule, MatSelectModule,
    NgxDropzoneModule,
    DndModule, NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormControlValidationDirective,
    LoaderComponent
  ],
  templateUrl: './claim-listing.component.html',
  styleUrl: './claim-listing.component.scss'
})
export class ClaimListingComponent {
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public files: File[] = []
  public isImageUploading: boolean = false
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public imagePreviews: any
  public imageUrl: any
  public claimBusinessForm: FormGroup
  // public phone_number = new FormControl()
  public position_business = new FormControl()
  public postId: any
  public listingTitle: any
  public loader: boolean = false
  public claimedStatus: any

  constructor(private businessService: BusinessService, private fb: FormBuilder,
    private claimService: ClaimService, private _activatedRoute: ActivatedRoute,
    private eventService: EventService, private router: Router,
    private location: Location) {

    this.claimBusinessForm = this.fb.group({
      listing_title: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone_number: ["", Validators.required]
    })

    this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
    })
    this._activatedRoute.queryParams.subscribe(params => {
      this.listingTitle = params['listingTitle'];
      this.claimBusinessForm.controls['listing_title'].setValue(this.listingTitle)
    })
  }

  ngOnInit() {
    this.fetchClamiedBusinessStatus()
  }

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

  public handleClaimBusiness() {
    this.loader = true

    const body = {
      post_id: this.postId,
      listing_title: this.claimBusinessForm.value.listing_title,
      user_fullname: this.claimBusinessForm.value.full_name,
      // email: this.claimBusinessForm.value.email,
      user_number: this.claimBusinessForm.value?.phone_number?.e164Number,
      user_position: this.position_business.value,
      Verification_upload: this.imageUrl,
      // country_code: this.claimBusinessForm.value?.phone_number?.dialCode,
    }
    this.claimService.claimBusiness(body).subscribe({
      next: (res) => {
        this.loader = false
        if (!res.status) {
          Swal.fire({
            toast: true,
            text: res.message,
            animation: false,
            icon: 'error',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          this.location.back();
        } else {
          Swal.fire({
            toast: true,
            text: res.message,
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        }
        this.fetchClamiedBusinessStatus()
      },
      error: (err) => {
        this.loader = false
      }
    })
    this.claimBusinessForm.reset();
    this.imageUrl = ''
  }


  public fetchClamiedBusinessStatus() {
    const postId = this.postId
    this.eventService.getClaimBusinessLisiting(postId).subscribe({
      next: (res) => {
        scrollToTop()
        console.log("check claimed lsiiting", res)
        this.claimedStatus = res.data
      },
      error: (err) => {

      }
    })
  }

  public goToLisiting() {
    this.router.navigateByUrl('/business-listing')
  }

}
