import { NgClass, NgFor, NgIf, JsonPipe } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { NgSelectModule } from '@ng-select/ng-select'
import { AuthenticationService, LocalStorageService, Roles } from '@vietlist/shared'
import { NgxDropzoneModule } from 'ngx-dropzone'
import {
  NgxIntlTelInputModule,
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input-gg'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'
import { LoaderComponent } from 'src/app/common-ui'
import { BusinessCategoryResponse } from 'src/app/manage-business/service/business.interface'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { MatDatepickerModule } from '@angular/material/datepicker'
import Swal from 'sweetalert2'
import { MatNativeDateModule } from '@angular/material/core'
import { EventService } from '../../service/event.service'
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    JsonPipe,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatCheckboxModule

  ],

  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
})
export class AddEventComponent {
  public isloader: boolean = false
  public debounce: boolean = false
  public recurringEvent = new FormControl('')
  public recaptcha = new FormControl('')
  public latitude: number = 0
  public longitude: number = 0
  public separateDialCode = true
  public isImageUploading: boolean = false
  public levelOneImageArr: any[] = []
  public isFirstStepCompleted: boolean = false
  public status = new FormControl('')
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public ImageUrl: any
  public postId:any
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public verification_upload: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public latt!: number
  public longi!: number
  public selectedMapView = 'default'
  public categoriesValue: any
  public post_category: BusinessCategoryResponse[] = []
  public post_tags: any[] = []
  public isEditable = false
  public addEventForm!: FormGroup
  public firstFormGroup!: FormGroup
  public secondFormGroup!: FormGroup
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
  public vediosHide: any
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
  public checkValue: any
  public userInfo:any
  /**
   *
   * @param _formBuilder
   * @param businessService
   * @param localStorageService
   */

  constructor(
    private _formBuilder: FormBuilder,
    private businessService: BusinessService,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
    private cd:ChangeDetectorRef,
    private router:Router,
    private sessionService:AuthenticationService,
    private _activatedRoute:ActivatedRoute
  ) {
    this.addEventForm = this._formBuilder.group({
      event_title: ['', Validators.required],
      eventStartDate: [''],
      eventEndDate: [''],
      post_category: ['', Validators.required],
      event_description: ['', Validators.required],
      website: [''],
      event_duration: [''],
      repeats_event: [''],
      event_type: [''],
      occurrences: [''],
      end_date_recurring: [''],
      mapview: [''],
      startDate: [''],
      endDate: ['']
    })

    const loginData = this.localStorageService.getData('loginInfo')
    this.userInfo = JSON.parse(loginData)

    this.recurringEvent.valueChanges.subscribe((res) => {
      console.log(res, 'recurringEvent')
      this.checkValue = res
      const controlsToValidate = [
        // 'event_duration',
        // 'repeats_event',
        // 'event_type',
        // 'occurrences',
        // 'end_date_recurring'
        'startDate',
        'endDate'
      ];
      
      controlsToValidate.forEach(controlName => {
        const control = this.addEventForm.get(controlName);
        if (res) {
          control?.setValidators(Validators.required);
        } else {
          control?.clearValidators();
        }
        control?.updateValueAndValidity();
      });
    });


    if(this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
    })
    
  }

  ngOnInit() {
    this.getBusinessCat()

    if (this.postId) {
      this.getBusinessFormDetails(this.postId)
    }

    this.sessionService.isAuthenticated$.subscribe((res)=>{
      if(res == true && this.userInfo.user_role == Roles.businessOwner){

      }else {
        Swal.fire({
          toast: true,
          text: 'Signup as a business owner to add events !',
          animation: false,
          icon: 'warning',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        this.router.navigateByUrl('/register')
      }
    })
    this.initMap()
  }

  public onSelect(event: any) {
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
      this.isFilesPresent = true
      const file = event.addedFiles[0]
      this.businessService.uploadMedia(this.files[0]).subscribe({
        next: (res: any) => {
          this.uploadMediaUrl = res.image_url
        },
        error: (err: any) => {
          // Handle errors
        },
      })
    }
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

  public onTagSelectionChange() {
    const tagNames = this.tags.map((tag) => tag.toString()) // Convert tag numbers to strings
    this.selectedTagsString = tagNames.join(', ') // Convert array to string with comma separator
  }

  public getBusinessCat() {
    this.eventService.getEventCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
      },
      error: (err) => { },
    })
  }

  public onCategoryChange() {
    this.categoriesValue = this.addEventForm.value.post_category
    this.getDefaultCat()
  }

  // public getTags() {
  //   this.eventService.getEventTags().subscribe({
  //     next: (res: any) => {
  //       this.post_tags = res.data
  //     },
  //     error: (err) => { },
  //   })
  // }
  public removeImageItem() {
    this.ImageUrl = ''
    // this.levelOneImageArr.splice(index, 1);
  }
  public resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`)
  }

  public getDefaultCat() {
    this.businessService.getDefaultCat(this.categoriesValue).subscribe({
      next: (res: any) => {
        this.selectedDefaultCategories = res.data
      },
      error: (err) => { },
    })
  }

  public getAddress(place: any) {
    this.fullAddress = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
      element.types.filter((type: any) => {
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
    this.businessService
      .getBusiness(this.postId ? this.postId : postId)
      .subscribe({
        next: (res) => {
          this.businessFormDetails = res?.data?.[0] || null
          this.tags = this.businessFormDetails.post_tags.map(
            (tag: any) => tag.id,
          )
          this.uploadMediaUrl = this.businessFormDetails.logo
          if (this.uploadMediaUrl) {
            this.isFilesPresent = true
          } else {
            this.isFilesPresent = false
          }
          this.verification_upload =
            this.businessFormDetails.verification_upload
          this.verifiedBadge = this.businessFormDetails.verified_badge
          this.addEventForm.patchValue({
            post_title: this.businessFormDetails.post_title
              ? this.businessFormDetails.post_title
              : 'NA',
            post_content: this.businessFormDetails.post_content
              ? this.businessFormDetails.post_content
              : 'NA',
            business_email: this.businessFormDetails.business_email
              ? this.businessFormDetails.business_email
              : 'NA',
            contact_phone: this.businessFormDetails.contact_phone
              ? this.businessFormDetails.contact_phone
              : 'NA',
            website: this.businessFormDetails.website
              ? this.businessFormDetails.website
              : 'Na',
            mapview: this.businessFormDetails.mapview
              ? this.businessFormDetails.mapview
              : 'NA',
            post_category: this.businessFormDetails.post_category?.map(
              (category: any) => category?.id,
            ),
            default_category: this.businessFormDetails.default_category
              ? this.businessFormDetails.default_category.id
              : 'NA',
            instagram: this.businessFormDetails.instagram,
            facebook: this.businessFormDetails.facebook,
          })
          this.selectedDefaultCategories.push({
            id: this.businessFormDetails.default_category.id,
            name: this.businessFormDetails.default_category.name,
          })

          this.street = this.businessFormDetails.street
          this.latitude = Number(this.businessFormDetails.latitude)
          this.longitude = Number(this.businessFormDetails.longitude)
          this.latt = this.businessFormDetails.latitude
          this.longi = this.businessFormDetails.longitude
          this.zipcode = this.businessFormDetails.zip
          this.state = this.businessFormDetails.region
          this.country = this.businessFormDetails.country
          this.city = this.businessFormDetails.city

          this.initMap()
        },
        error: (err) => { },
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
    }
  }

  public changeMapView() {
    console.log('Selected map view:', this.selectedMapView)

    if (this.map !== null) {
      console.log('Changing map view...')
      switch (this.selectedMapView) {
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



  public onSelectImages(event: any) {
    this.files = [...event.addedFiles]
    // if (this.levelOneImageArr.length >= 5) {
    //   Swal.fire({
    //     toast: true,
    //     text: 'You have already selected the maximum number of images allowed.Upgrade Plan for more.',
    //     animation: false,
    //     icon: 'warning',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (this.vediosHide.level_id == '1') {

    //   if (this.files.length > 5) {
    //     console.log('upload 5 images ')
    //     Swal.fire({
    //       toast: true,
    //       text: 'Max 5 images allowed. Upgrade your plan for more',
    //       animation: false,
    //       icon: 'error',
    //       position: 'top-right',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //     })
    //     return
    //   }
    // }
    this.displayLevelOneImages()
  }

  public displayLevelOneImages() {
    let maxImages: any = 5;
    // if (this.files.length > maxImages) {
    //   Swal.fire({
    //     toast: true,
    //     text: `You can only select up to ${maxImages} images at a time.`,
    //     animation: false,
    //     icon: 'error',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    this.isImageUploading = true;


    const filesToUpload = this.files.slice(0, maxImages);

    filesToUpload.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Upload each file
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false;
          this.ImageUrl = res.image_url
          this.levelOneImageArr.push(res.image_url);
          if (this.levelOneImageArr.length >= maxImages) {
            this.isImageUploading = false;
          }
        },
        error: (err: any) => {
          this.isImageUploading = false;
          // Handle errors if needed
        },
      });
    });
  }

  public addBusiness(val?: any) {
    this.debounce = true
    this.isloader = true
    // const body: any = {
    //   post_title: this.addEventForm.value.event_title,
    //   post_category: this.addEventForm.value.post_category.join(', '),
    //   default_category: this.addEventForm.value.default_category,
    //   latitude: this.latitude,
    //   longitude: this.longitude,
    //   city: this.city,
    //   region: this.state,
    //   country: this.country,
    //   zip: this.zipcode,
    //   post_content: this.addEventForm.value.event_description,
    //   featured_image: this.ImageUrl,
    //   post_tags: this.selectedTagsString,
    //   street: this.fullAddress,
    //   mapview: this.addEventForm.value.mapview,
    //   status: this.status.value,
    //   event_dates: {
    //     start_date:this.addEventForm.value.eventStartDate,
    //     end_date:this.addEventForm.value.eventEndDate,
    //     all_day: this.checkValue,
    //     start_time: this.addEventForm.value.startDate,
    //     end_time: this.addEventForm.value.endDate,

    //   }
    // }

    const body: any = {
      post_title: this.addEventForm.value.event_title,
      post_category: this.addEventForm.value.post_category,
      latitude: this.latitude,
      longitude: this.longitude,
      city: this.city,
      region: this.state,
      country: this.country,
      zip: this.zipcode,
      post_content: this.addEventForm.value.event_description,
      featured_image: this.ImageUrl,
      street: this.fullAddress,
      mapview: this.addEventForm.value.mapview,
    };
    console.log(body)
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue));
        });
      } else {
        formData.append(key, String(value));
      }
    });
    const eventDates = {
      start_date: this.addEventForm.value.eventStartDate,
      end_date: this.addEventForm.value.eventEndDate,
      all_day: this.checkValue,
      start_time: this.addEventForm.value.startDate,
      end_time: this.addEventForm.value.endDate,
    };

    formData.append('event_dates', JSON.stringify(eventDates));

    // Log FormData contents
    formData.forEach((value, key) => {
      console.log(key, value);
    });



    // if (this.isFormFilled) {
    //   this.isloader = true
    //   const updatebody: any = {
    //     post_title: this.addEventForm.value.event_title,
    //     post_category: this.addEventForm.value.post_category.join(', '),
    //     default_category: this.addEventForm.value.default_category,
    //     latitude: this.latitude,
    //     longitude: this.longitude,
    //     city: this.city,
    //     region: this.state,
    //     country: this.country,
    //     zip: this.zipcode,
    //     post_content: this.addEventForm.value.event_description,
    //     featured_image: this.ImageUrl,
    //     post_tags: this.selectedTagsString,
    //     street: this.fullAddress,
    //     mapview: this.addEventForm.value.mapview,
    //     status: this.status.value,
    //     post_id: this.localStoragePostId
    //       ? this.localStoragePostId
    //       : this.postId,
    //   }
    //   this.businessService.updateBusiness(updatebody).subscribe({
    //     next: (res) => {
    //       this.isloader = false
    //       this.addBusinessFormData = res
    //       this.isFormFilled = true
    //       this.isSubscriptionStepper = true
    //       this.getBusinessFormDetails(
    //         this.localStoragePostId ? this.localStoragePostId : this.postId,
    //       )
    //       Swal.fire({
    //         toast: true,
    //         text: 'Business Information updated successfully!',
    //         animation: false,
    //         icon: 'success',
    //         position: 'top-right',
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true,
    //       })
    //     },
    //     error: (err) => {
    //       this.isloader = false
    //     },
    //   })
    // } else {
      this.businessService.addEvent(formData).subscribe({
        next: (res) => {
          this.debounce = false
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
          // this.isSubscriptionStepper = true
          // this.getBusinessFormDetails(this.postId)
          // this.localStorageService.saveData('postId', this.postId)
          // this.businessService.isBusinessFormFilled.next(true)
          // this.localStorageService.saveData('isBusinessFormFilled', 'true')
          // const post_id = res.post_id
          // this.businessService.storePostId.next(post_id)
          Swal.fire({
            toast: true,
            text: 'Event Information added successfully!',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          this.router.navigateByUrl('/manage-profile/manage-events')
        },
        error: (err) => {
          this.isloader = false
          this.debounce = false
        },
      })
    // }
  }


}
