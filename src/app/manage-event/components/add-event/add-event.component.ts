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
import { AuthenticationService, FullPageLoaderService, LocalStorageService, Roles } from '@vietlist/shared'
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
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
// import { Router } from 'express'

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
  public userDetail: any
  public recurringEvent = new FormControl('')
  public recaptcha = new FormControl('')
  public latitude: number = 0
  public longitude: number = 0
  public separateDialCode = true
  public isImageUploading: boolean = false
  public levelOneImageArr: any[] = []
  public isFirstStepCompleted: boolean = false
  public isBookable = new FormControl('')
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public ImageUrl: any
  public postId: any
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public verification_upload: any
  public eventDetails: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public latt!: number
  public longi!: number
  public selectedMapView = 'default'
  public categoriesValue: any
  public post_categorys: BusinessCategoryResponse[] = []
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
  public userInfo: any
  public userDetailsLevel_id: any
  public minDate = new Date();
  public isBookableClicked: boolean = false
  public maxDate: any
  public maxTotalImages:any
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
    private authService: AuthenticationService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private sessionService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private fullPageLoaderService: FullPageLoaderService,
    private profileService: ProfileService,
  ) {
    this.addEventForm = this._formBuilder.group({
      event_title: ['', Validators.required],
      eventStartDate: [''],
      eventEndDate: [''],
      post_category: ['', Validators.required],
      event_description: ['', Validators.required],
      mapview: [''],
      startTime: [''],
      endTime: [''],
      price: [''],
      number_of_bookings: [''],
      booking_end_date: [''],
      booking_start_date: ['']
    })
    this.fetchProfileDetail()

    const getLevelId = localStorageService.getData('level_id')
    this.isBookable.valueChanges.subscribe((res: any) => {
      if (res == true) {
        this.isBookableClicked = true;
        this.addEventForm.get('price')?.setValidators(Validators.required);
        this.addEventForm.get('number_of_bookings')?.setValidators(Validators.required);
        this.addEventForm.get('booking_end_date')?.setValidators(Validators.required);
        this.addEventForm.get('booking_start_date')?.setValidators(Validators.required);
      } else {
        this.isBookableClicked = false;
        this.addEventForm.get('price')?.clearValidators();
        this.addEventForm.get('number_of_bookings')?.clearValidators();
        this.addEventForm.get('booking_end_date')?.clearValidators();
        this.addEventForm.get('booking_start_date')?.clearValidators();
      }
      this.addEventForm.get('price')?.updateValueAndValidity();
      this.addEventForm.get('number_of_bookings')?.updateValueAndValidity();
      this.addEventForm.get('booking_end_date')?.updateValueAndValidity();
      this.addEventForm.get('booking_start_date')?.updateValueAndValidity();
    });


    this.userDetailsLevel_id = getLevelId
    this.authService.userDetails.subscribe((res: any) => {
      if (res) {
        this.vediosHide = res


      }

    })

    this.addEventForm.get('number_of_bookings')?.valueChanges.subscribe((res) => {
      if (this.userDetail?.level_id == '2') {

        if (res > 20) {
          Swal.fire({
            toast: true,
            text: 'You can only add 20 bookings for this plan.',
            animation: false,
            icon: 'warning',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          this.addEventForm.get('number_of_bookings')?.setValue('')
        }
      }
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
          control?.clearValidators();
        } else {
          control?.setValidators(Validators.required);

        }
        control?.updateValueAndValidity();
      });
    });


    this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
    })

  }

  public selectedEventEndDate(selectedDate: Date) {
    const maxBookingEndDate = new Date(selectedDate);
    maxBookingEndDate.setDate(maxBookingEndDate.getDate() - 1);
    this.maxDate = maxBookingEndDate
  }

  ngOnInit() {
    this.getBusinessCat()

    if (this.postId) {
      this.getEventDetails()
    }



    // this.sessionService.isAuthenticated$.subscribe((res)=>{
    //   if(res == true && this.userInfo.user_role == Roles.businessOwner){

    //   }else {
    //     Swal.fire({
    //       toast: true,
    //       text: 'Signup as a business owner to add events !',
    //       animation: false,
    //       icon: 'warning',
    //       position: 'top-right',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //     })
    //     // this.router.navigateByUrl('/register')
    //   }
    // })

    this.initMap()
  }


  public fetchProfileDetail() {
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.userDetail = res.data.user
        console.log(this.userDetail)
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')

      },
    })
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
        this.post_categorys = res.data
      },
      error: (err) => { },
    })
  }

  public onCategoryChange() {
    this.categoriesValue = this.addEventForm.value.post_category
  }
  public removeImageItem(index: any) {
    this.levelOneImageArr.splice(index, 1);
  }


  // public removeImageItem() {
  //   this.ImageUrl = ''
  // }


  public resolved(captchaResponse: string | null) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`)
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


  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (this.latitude && this.longitude) {
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



  // public onSelectImages(event: any) {
  //   this.files = [...event.addedFiles]

  //   this.displayLevelOneImages()
  // }
  // public onSelectImages(event: any) {
  //   this.files = [...event.addedFiles]
  //   if (this.userDetail.level_id == '1') {
  //     if (this.files.length > 5) {
  //       console.log('upload 5 images ')
  //       Swal.fire({
  //         toast: true,
  //         text: 'Max 5 images allowed. Upgrade your plan for more',
  //         animation: false,
  //         icon: 'error',
  //         position: 'top-right',
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //       })
  //       return
  //     }
  //   }
  //   if (this.userDetail.level_id == '2') {
  //     if (this.files.length > 5) {
  //       console.log('upload 5 images ')
  //       Swal.fire({
  //         toast: true,
  //         text: 'Max 20 images allowed. Upgrade your plan for more',
  //         animation: false,
  //         icon: 'error',
  //         position: 'top-right',
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //       })
  //       return
  //     }
  //   }
  //   this.displayLevelOneImages()
  // }

  public onSelectImages(event: any) {
    const maxImagesPerUpload = 5; // Max images per upload action
    this.maxTotalImages = this.userDetail.level_id === '1' ? 5 : this.userDetail.level_id === '2' ? 20  : this.userDetail.level_id === '3' ? Infinity  : 0;
    const totalUploadedImages = this.levelOneImageArr.length;
    const remainingImagesCapacity = this.maxTotalImages - totalUploadedImages;
  
    const selectedFiles = [...event.addedFiles];
  
    if (selectedFiles.length > maxImagesPerUpload || selectedFiles.length > remainingImagesCapacity) {
      Swal.fire({
        toast: true,
        text: `Max ${maxImagesPerUpload} images allowed per upload. You can only upload ${this.maxTotalImages} for this plan.`,
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }
  
    this.files = selectedFiles;
    this.displayLevelOneImages();
  }
  
  public displayLevelOneImages() {
    this.isImageUploading = true;
  
    const maxImagesPerUpload = 5; // Max images per upload action
    const filesToUpload = this.files.slice(0, maxImagesPerUpload);
  
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
          this.levelOneImageArr.push(res.image_url);
          if (this.levelOneImageArr.length >= this.maxTotalImages) {
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
  

  formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      // Handle invalid or missing date
      return 'Invalid Date';
    }
  
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero based
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }
  
  public addEvent(val?: any) {
    this.debounce = true
    this.isloader = true
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
      featured_image: this.levelOneImageArr,
      street: this.fullAddress,
      mapview: this.addEventForm.value.mapview,
      is_bookable_: this.isBookable.value ? 1 : 0,
      price: this.addEventForm.value.price,
      number_of_bookings: this.addEventForm.value.number_of_bookings,
      booking_start_date: this.formatDate(this.addEventForm.value.booking_start_date),
      booking_end_date: this.formatDate(this.addEventForm.value.booking_end_date),
    };
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
      start_time: this.addEventForm.value.startTime,
      end_time: this.addEventForm.value.endTime,
    };

    formData.append('event_dates', JSON.stringify(eventDates));
    formData.forEach((value, key) => {
    });
    if (this.postId) {
      formData.append('post_id', this.postId);
      this.eventService.updateEvent(formData).subscribe({
        next: (res) => {
          this.debounce = false
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
          Swal.fire({
            toast: true,
            text: 'Event Information updated successfully!',
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
    } else {
      this.eventService.addEvent(formData).subscribe({
        next: (res) => {
          this.debounce = false
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
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
    }
  }



  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getEventDetailsByPostId(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.eventDetails = res?.data[0] || 'NA'
        this.latitude = Number(this.eventDetails?.latitude),
          this.longitude = Number(this.eventDetails?.longitude)
        console.log(this.eventDetails, 'check details')
        this.state = this.eventDetails?.region
        this.addEventForm.patchValue({
          event_title: this.eventDetails.post_title,
          eventStartDate: this.eventDetails.event_dates.start_date,
          eventEndDate: this.eventDetails.event_dates.end_date,
          post_category: this.eventDetails.post_category?.id,
          event_description: this.eventDetails.post_content,
          startTime: this.eventDetails.event_dates.start_time,
          endTime: this.eventDetails.event_dates.end_time,
          recurringEvent: this.eventDetails.event_dates.all_day,
          booking_start_date: this.eventDetails.booking_start_date,
          booking_end_date: this.eventDetails.booking_end_date,
          number_of_bookings: this.eventDetails.number_of_bookings,
          price:this.eventDetails?.price
        })
        this.street = this.eventDetails.street,
          this.fullAddress = this.eventDetails?.street,
          this.zipcode = this.eventDetails.zip,
          this.city = this.eventDetails.city,
          this.country = this.eventDetails.country,
          this.ImageUrl = this.eventDetails.featured_image
        this.initMap()
      },
      error: (err) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }



}
