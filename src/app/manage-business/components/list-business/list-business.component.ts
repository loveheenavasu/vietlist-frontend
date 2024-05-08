import { MatCheckboxModule } from '@angular/material/checkbox'

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common'
import { BusinessCategoryResponse } from './../../service/business.interface'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { ChangeDetectorRef, Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component'
import { BusinessBioComponent } from '../business-bio/business-bio.component'
import { ConsultationFormComponent } from '../consultation-form/consultation-form.component'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { NgSelectModule } from '@ng-select/ng-select'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import { BusinessService } from '../../service/business.service'
import {
  AuthenticationService,
  FullPageLoaderService,
  LocalStorageService,
} from '@vietlist/shared'
import Swal from 'sweetalert2'
import { PromotionsFormComponent } from '../promotions-form/promotions-form.component'
import { LoaderComponent } from 'src/app/common-ui'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'

@Component({
  selector: 'app-list-business',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    SubscriptionFormComponent,
    BusinessBioComponent,
    ConsultationFormComponent,
    PromotionsFormComponent,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    NgSelectModule,
    NgxIntlTelInputModule,
    NgClass,
    NgFor,
    NgIf,
    RouterOutlet,
    LoaderComponent,
    NgxDropzoneModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    JsonPipe,
    MatCheckboxModule,
  ],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss',
  host: {
    ngSkipHydration: 'true',
  },
})
export class ListBusinessComponent {
  public isloader: boolean = false
  public latitude: number = 0
  public longitude: number = 0
  public separateDialCode = true
  public isImageUploading: boolean = false
  public isFirstStepCompleted: boolean = false
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public vediosHide: any
  public term_and_condition = new FormControl('')
  public recaptcha = new FormControl('')
  public verification_upload: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public latt!: number
  public longi!: number
  public selectedMapView = 'default'
  public categoriesValue: any
  public post_category: BusinessCategoryResponse[] = []
  public post_tags: any[] = []
  public isEditable = false
  public businessInfoForm!: FormGroup
  public firstFormGroup!: FormGroup
  public secondFormGroup!: FormGroup
  public postId: any
  public businessFormDetails: any
  public selectedDefaultCategories: any[] = []
  public selected0defaultCat: any
  public addBusinessFormData: any
  public isSubscriptionStepper: boolean = false
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public localStoragePostId: any
  public isFormFilled: boolean = false
  public filesString: any
  public files: File[] = []
  public fullAddress: any
  public imageName: any
  public uploadMediaUrl: any
  public isFilesPresent: boolean = false
  public display: any
  public zoom = 6
  public selectedTagsString = ''
  public street = ''
  public tags: any[] = []
  public verifiedBadge: any
  public businessLogoUrl: any[] = []

  public levelOneImageArr: any[] = []
  public imageUrl: any
  public filess: any
  public userDetail: any
  public hidemapview!: boolean
  public hideVedioupload!: boolean
  public isImageLoading: boolean = false
  /**
   *
   * @param _formBuilder
   * @param businessService
   * @param localStorageService
   */
  public userDetailsLevel_id: any
  public isParamsId: boolean = false
  public currentRoute: any
  constructor(
    private _formBuilder: FormBuilder,
    private businessService: BusinessService,
    private localStorageService: LocalStorageService,
    private fullPageLoader: FullPageLoaderService,
    private cd: ChangeDetectorRef,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.fetchProfileDetail()

    this.businessInfoForm = this._formBuilder.group({
      post_title: ['', [Validators.required, Validators.maxLength(90)]],
      contact_phone: ['', Validators.required],
      business_email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      post_category: ['', Validators.required],
      default_category: ['', Validators.required],
      post_content: ['', [Validators.required]],
      website: [
        '',
        Validators.pattern(
          /^((https?|HTTPS?):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=%]\??[^#\s]*)?$/i,
        ),
      ],
      mapview: [''],
    })
    this.currentRoute = this.router.url
    this.route.params.subscribe((res: any) => {
      if (res?.id) {
        console.log(res.id, 'id')
        this.isParamsId = true
        this.getBusinessFormDetails(res?.id)
      }
    })
    this.businessService.storePostId.subscribe((res) => {
      this.postId = res
    })
    const id = localStorageService.getData('postId')
    this.postId = Number(id)

    const postId = localStorageService.getData('postId')
    this.localStoragePostId = Number(postId)

    this.businessService.storePostId.subscribe((res) => {
      this.localStoragePostId = res
    })

    this.businessService.isBusinessFormFilled.subscribe((res) => {
      this.isFormFilled = res
    })

    const localFlag = this.localStorageService.getData('isBusinessFormFilled')
    this.isFormFilled = Boolean(localFlag)
  }

  ngOnInit() {
    this.authService.userDetails.subscribe((res: any) => {
      this.fullPageLoader.showLoader()
      if (res) {
        this.fullPageLoader.hideLoader()
        this.vediosHide = res
        this.userDetailsLevel_id = res
        if (res.level_id == '1') {
          this.hidemapview = true
        } else {
          this.hidemapview = false
        }
      }
    })
    this.getBusinessCat()

    if (this.postId) {
      this.getBusinessFormDetails(this.postId)
    }
    this.getTags()
    this.initMap()
  }

  public fetchProfileDetail() {
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.userDetail = res.data.user
        this.localStorageService.saveData(
          'userDetails',
          this.userDetail.level_id,
        )
        this.authService.userDetails.next(this.userDetail)
      },
      error: (err: any) => {},
    })
  }

  public onRemove() {
    this.uploadMediaUrl = ''
    if (this.files.length === 0) {
      this.isFilesPresent = false
    }
  }

  public getSafeURL(file: File): any {
    return URL.createObjectURL(file)
  }

  public onSelectLogo(event: any) {
    this.files.push(...event.addedFiles)
    const formData = new FormData()
    for (var i = 0; i < this.files.length; i++) {
      console.log(this.files[i], 'this.files[i]')
      formData.append('file[]', this.files[i])
    }
    this.displayBusinessLogo()
  }

  public displayBusinessLogo() {
    if (this.files.length === 0) {
      return // No files to upload
    }

    this.isImageLoading = true
    const latestFile = this.files[this.files.length - 1] // Get the latest file
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result as string
      this.businessService.uploadMedia(latestFile).subscribe({
        next: (res: any) => {
          this.isImageLoading = false
          this.imageUrl = res.image_url
          this.businessLogoUrl = [res.image_url] // Replace old preview with new one
        },
        error: (err: any) => {
          // Handle errors
        },
      })
    }

    reader.readAsDataURL(latestFile)
  }

  public removeItem(index: any) {
    this.businessLogoUrl.splice(index, 1)
  }

  public removeImageItem(index: any) {
    this.levelOneImageArr.splice(index, 1)
  }

  public onTagSelectionChange() {
    const tagNames = this.tags.map((tag) => tag.toString()) // Convert tag numbers to strings
    this.selectedTagsString = tagNames.join(', ') // Convert array to string with comma separator
  }

  public getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
      },
      error: (err) => {},
    })
  }

  public onCategoryChange() {
    this.categoriesValue = this.businessInfoForm.value.post_category
    this.getDefaultCat()
  }

  public getTags() {
    this.businessService.getTags().subscribe({
      next: (res: any) => {
        this.post_tags = res.data
      },
      error: (err) => {},
    })
  }

  public getDefaultCat() {
    this.businessService.getDefaultCat(this.categoriesValue).subscribe({
      next: (res: any) => {
        this.selectedDefaultCategories = res.data
      },
      error: (err) => {},
    })
  }

  public getAddress(place: any) {
    console.log(place)
    this.fullAddress = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.forEach((element: any) => {
      element.types.forEach((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
        }
      })
    })
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
    this.cd.detectChanges()
    this.initMap()
  }

  public getBusinessFormDetails(postId: any) {
    this.fullPageLoader.showLoader()
    this.businessService
      .getBusiness(this.postId ? this.postId : postId)
      .subscribe({
        next: (res) => {
          this.fullPageLoader.hideLoader()
          console.log(res, 'getApiResponse')
          this.businessFormDetails = res?.data?.[0] || null

          this.tags = this.businessFormDetails?.post_tags.map(
            (tag: any) => tag.id,
          )
          this.uploadMediaUrl = this.businessFormDetails?.logo
          if (this.uploadMediaUrl) {
            this.isFilesPresent = true
          } else {
            this.isFilesPresent = false
          }
          this.verification_upload =
            this.businessFormDetails?.verification_upload
          this.verifiedBadge = this.businessFormDetails?.verified_badge
          this.businessInfoForm.patchValue({
            post_title: this.businessFormDetails?.post_title
              ? this.businessFormDetails?.post_title
              : 'NA',
            post_content: this.businessFormDetails?.post_content
              ? this.businessFormDetails?.post_content
              : 'NA',
            business_email: this.businessFormDetails?.business_email
              ? this.businessFormDetails?.business_email
              : 'NA',
            contact_phone: this.businessFormDetails?.contact_phone
              ? this.businessFormDetails?.contact_phone
              : 'NA',
            website: this.businessFormDetails?.website
              ? this.businessFormDetails?.website
              : 'Na',
            mapview: this.businessFormDetails?.mapview
              ? this.businessFormDetails?.mapview
              : 'NA',
            post_category: this.businessFormDetails?.post_category?.map(
              (category: any) => category?.id,
            ),
            default_category: this.businessFormDetails?.default_category
              ? this.businessFormDetails?.default_category.id
              : 'NA',
            instagram: this.businessFormDetails?.instagram,
            facebook: this.businessFormDetails?.facebook,
            logo: this.businessFormDetails?.logo,
          })
          this.selectedDefaultCategories.push({
            id: this.businessFormDetails?.default_category?.id,
            name: this.businessFormDetails?.default_category?.name,
          })
          this.levelOneImageArr = this.businessFormDetails?.image
          this.street = this.businessFormDetails?.street
          this.latitude = Number(this.businessFormDetails?.latitude)
          this.longitude = Number(this.businessFormDetails?.longitude)
          this.latt = this.businessFormDetails?.latitude
          this.longi = this.businessFormDetails?.longitude
          this.zipcode = this.businessFormDetails?.zip
          this.state = this.businessFormDetails?.region
          this.country = this.businessFormDetails?.country
          this.city = this.businessFormDetails?.city

          this.initMap()
        },
        error: (err) => {},
      })
  }

  public initMap() {
    // Get the map container element by its ID
    const mapElement = document.getElementById('map')
    // Ensure that the map element is not null
    if (mapElement !== null) {
      console.log('Initializing map...')
      // Create a new Google Map instance
      this.map = new google.maps.Map(mapElement, {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: { lat: this.latitude, lng: this.longitude },
          map: this.map,
          title: 'Marker Title',
        })
      }
    } else {
      console.error('Map element not found.')
    }
  }

  public changeMapView() {
    console.log('Selected map view:', this.businessInfoForm.value.mapview)
    if (this.map !== null) {
      console.log('Changing map view...')
      switch (this.businessInfoForm.value.mapview) {
        case 'satellite':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE)
          break
        case 'hybrid':
          this.map.setMapTypeId(google.maps.MapTypeId.HYBRID)
          break
        case 'terrain':
          this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN)
          break
        default:
          this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP)
          break
      }
    } else {
      console.error('Map not initialized.')
    }
  }

  public resolved(captchaResponse: string | null) {}

  checkInput(event: any) {}

  public addBusiness(val?: any) {
    this.isloader = true
    const body: any = {
      post_title: this.businessInfoForm.value.post_title,
      contact_phone: parseInt(
        this.businessInfoForm.value.contact_phone?.e164Number,
      ),
      business_email: this.businessInfoForm.value.business_email,
      post_category: this.businessInfoForm.value.post_category.join(', '),
      default_category: this.businessInfoForm.value.default_category,
      latitude: this.latitude,
      longitude: this.longitude,
      city: this.city,
      region: this.state,
      country: this.country,
      zip: this.zipcode,
      post_content: this.businessInfoForm.value.post_content,
      website: this.businessInfoForm.value.website,
      post_tags: this.selectedTagsString,
      street: this.fullAddress,
      logo: this.businessLogoUrl[0],
      mapview: this.businessInfoForm.value.mapview,
      image: this.levelOneImageArr,
    }
    if (this.isFormFilled || this.postId || this.isParamsId) {
      this.isloader = true
      const updatebody: any = {
        post_title: this.businessInfoForm.value.post_title,
        contact_phone: parseInt(
          this.businessInfoForm.value.contact_phone?.e164Number,
        ),
        business_email: this.businessInfoForm.value.business_email,
        post_category: this.businessInfoForm.value.post_category.join(', '),
        default_category: this.businessInfoForm.value.default_category,
        latitude: this.latitude,
        longitude: this.longitude,
        city: this.city,
        region: this.state,
        country: this.country,
        zip: this.zipcode,
        post_content: this.businessInfoForm.value.post_content,
        website: this.businessInfoForm.value.website,
        post_tags: this.selectedTagsString,
        street: this.fullAddress,
        logo: this.businessLogoUrl[0],
        mapview: this.businessInfoForm.value.mapview,
        post_id: this.localStoragePostId
          ? this.localStoragePostId
          : this.postId,
      }
      this.businessService.updateBusiness(updatebody).subscribe({
        next: (res) => {
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.isSubscriptionStepper = true
          this.getBusinessFormDetails(
            this.localStoragePostId ? this.localStoragePostId : this.postId,
          )
          if (this.userDetailsLevel_id.level_id == '1')
            this.router.navigateByUrl('/manage-profile/my-business')
        },
        error: (err) => {
          this.isloader = false
        },
      })
    } else if (this.userDetailsLevel_id.level_id == '1') {
      body.final_submission = 1
      ;(body.terms_conditions = this.term_and_condition.value),
        (body.image = this.levelOneImageArr)
      this.businessService.addBusiness(body).subscribe({
        next: (res) => {
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
          this.isSubscriptionStepper = true
          this.getBusinessFormDetails(this.postId)
          this.getBusinessFormDetails(this.postId)
          this.localStorageService.saveData('postId', this.postId)
          this.businessService.isBusinessFormFilled.next(true)
          this.localStorageService.saveData('isBusinessFormFilled', 'true')
          const post_id = res.post_id

          this.localStorageService.removeData('postId')
          this.localStorageService.removeData('isBusinessFormFilled')
          this.router.navigateByUrl('/manage-profile/my-business')
        },
        error: (err) => {
          this.isloader = false
          this.fullPageLoader.hideLoader()
        },
      })
    } else if (!this.isFormFilled) {
      this.businessService.addBusiness(body).subscribe({
        next: (res) => {
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
          this.isSubscriptionStepper = true
          this.getBusinessFormDetails(this.postId)
          this.localStorageService.saveData('postId', this.postId)
          this.businessService.isBusinessFormFilled.next(true)
          this.localStorageService.saveData('isBusinessFormFilled', 'true')
          const post_id = res.post_id
          this.businessService.storePostId.next(post_id)
        },
        error: (err) => {
          this.isloader = false
        },
      })
    }
  }

  public previewBusiness(val?: any) {
    console.log('click on preview button')
    console.log(this.isFormFilled, this.postId, 'Preview button')
    const body: any = {
      post_title: this.businessInfoForm.value.post_title,
      contact_phone: parseInt(
        this.businessInfoForm.value.contact_phone?.e164Number,
      ),
      business_email: this.businessInfoForm.value.business_email,
      post_category: this.businessInfoForm.value.post_category.join(', '),
      default_category: this.businessInfoForm.value.default_category,
      latitude: this.latitude,
      longitude: this.longitude,
      city: this.city,
      region: this.state,
      country: this.country,
      zip: this.zipcode,
      post_content: this.businessInfoForm.value.post_content,
      website: this.businessInfoForm.value.website,
      post_tags: this.selectedTagsString,
      street: this.fullAddress,
      logo: this.businessLogoUrl[0],
      mapview: this.businessInfoForm.value.mapview,
    }
    if (this.isFormFilled || this.postId) {
      console.log(this.isFormFilled, this.postId, 'postId + formFilled')
      const updatebody: any = {
        post_title: this.businessInfoForm.value.post_title,
        contact_phone: parseInt(
          this.businessInfoForm.value.contact_phone?.e164Number,
        ),
        business_email: this.businessInfoForm.value.business_email,
        post_category: this.businessInfoForm.value.post_category.join(', '),
        default_category: this.businessInfoForm.value.default_category,
        latitude: this.latitude,
        longitude: this.longitude,
        city: this.city,
        region: this.state,
        country: this.country,
        zip: this.zipcode,
        post_content: this.businessInfoForm.value.post_content,
        website: this.businessInfoForm.value.website,
        post_tags: this.selectedTagsString,
        street: this.fullAddress,
        logo: this.businessLogoUrl[0],
        mapview: this.businessInfoForm.value.mapview,
        post_id: this.localStoragePostId
          ? this.localStoragePostId
          : this.postId,
      }
      this.businessService.updateBusiness(updatebody).subscribe({
        next: (res) => {
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.isSubscriptionStepper = true
          if (res) {
            const post_id = this.localStoragePostId
              ? this.localStoragePostId
              : this.postId
            this.businessService.storePostId.next(post_id)
            this.router.navigate(['preview-business', post_id])
            // window.open(`/preview-business/${post_id}`, '_blank')
          }
          this.getBusinessFormDetails(
            this.localStoragePostId ? this.localStoragePostId : this.postId,
          )
        },
        error: (err) => {
          this.isloader = false
        },
      })
    } else if (!this.postId) {
      this.businessService.addBusiness(body).subscribe({
        next: (res) => {
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
          this.isSubscriptionStepper = true
          this.getBusinessFormDetails(this.postId)
          this.localStorageService.saveData('postId', this.postId)
          this.businessService.isBusinessFormFilled.next(true)
          this.localStorageService.saveData('isBusinessFormFilled', 'true')
          const post_id = res.post_id
          this.businessService.storePostId.next(post_id)
          this.router.navigate(['/preview-business', post_id])
          // window.open(`/preview-business/${post_id}`, '_blank')
        },
        error: (err) => {
          this.isloader = false
        },
      })
    }
  }

  public onSelectImages(event: any) {
    this.files = [...event.addedFiles]
    if (this.levelOneImageArr.length >= 5) {
      Swal.fire({
        toast: true,
        text: 'You have already selected the maximum number of images allowed.Upgrade Plan for more.',
        animation: false,
        icon: 'warning',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return
    }

    if (this.vediosHide.level_id == '1') {
      if (this.files.length > 5) {
        console.log('upload 5 images ')
        Swal.fire({
          toast: true,
          text: 'Max 5 images allowed. Upgrade your plan for more',
          animation: false,
          icon: 'error',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        return
      }
    }
    this.displayLevelOneImages()
  }

  public displayLevelOneImages() {
    let maxImages: any = 5
    if (this.files.length > maxImages) {
      Swal.fire({
        toast: true,
        text: `You can only select up to ${maxImages} images at a time.`,
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return
    }

    this.isImageUploading = true

    const filesToUpload = this.files.slice(0, maxImages)

    filesToUpload.forEach((file, index) => {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
      }
      reader.readAsDataURL(file)

      // Upload each file
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false
          this.levelOneImageArr.push(res.image_url)
          if (this.levelOneImageArr.length >= maxImages) {
            this.isImageUploading = false
          }
        },
        error: (err: any) => {
          this.isImageUploading = false
          this.isImageLoading = false
          // Handle errors if needed
        },
      })
    })
  }
}
