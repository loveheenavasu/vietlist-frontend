import { Router, RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common'
import {
  BusinessCategoryResponse,
  TagsResponse,
} from './../../service/business.interface'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { Component, Input } from '@angular/core'
import {
  FormBuilder,
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
import { LocalStorageService } from '@vietlist/shared'
import Swal from 'sweetalert2'
import { PromotionsFormComponent } from '../promotions-form/promotions-form.component'

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
    RouterOutlet
  ],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss',
})
export class ListBusinessComponent {
  public latitude!: any
  public longitude!: any
  public post_tags: any[] = []
  public separateDialCode = true
  public isFirstStepCompleted: boolean = false
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public categoriesValue: any
  public businessCat: BusinessCategoryResponse[] = []
  public tags: TagsResponse[] = []
  public isEditable = false
  public businessInfoForm!: FormGroup
  public firstFormGroup!: FormGroup
  public secondFormGroup!: FormGroup
  public postId: any
  public businessFormDetails: any
  public selectedDefaultCategories: any[] = []
  public selected0defaultCat: any
  public addBusinessFormData: any
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
    private router:Router
  ) {
    this.businessInfoForm = this._formBuilder.group({
      post_title: ['', Validators.required],
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
      post_content: ['', Validators.required],
      website: [''],
      mapview: [''],
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    })
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getBusinessCat()
    this.getTags()
    this.initMap()
  }
  state: any
  country: any
  city: any
  zipcode: any

  getAddress(place: any) {
  
    
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
      // Get latitude and longitude
      this.latitude = place.geometry.location.lat()
      this.longitude = place.geometry.location.lng()
      this.initMap()
    // this.address = place['formatted_address'];
    // this.phone = this.getPhone(place);
    // this.formattedAddress = place['formatted_address'];
    // this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }

  display: any
  // center: google.maps.LatLngLiteral = {
  //   lat: 22.2736308,
  //   lng: 70.7512555,
  // }
  zoom = 6

  /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*/
  // moveMap(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.center = event.latLng.toJSON()
  // }

  /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
  // move(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.display = event.latLng.toJSON()
  // }

  selectedTagsString = '' // String to store selected tags with commas

  initMap() {
    console.log(this.latitude, this.longitude, "LATLNG");
    let map;
  
    // Get the map container element by its ID
    const mapElement = document.getElementById('map');
  
    // Ensure that the map element is not null
    if (mapElement !== null) {
      // Create a new Google Map instance
      map = new google.maps.Map(mapElement, {
        center: { lat: this.latitude, lng: this.longitude }, // Use dynamic values
        zoom: 13,
      });
  
      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: { lat: this.latitude, lng: this.longitude }, // Use dynamic values
          map: map,
          title: 'Marker Title',
        });
      }
    } else {
      console.error('Map element not found');
    }
  }
  

  onTagSelectionChange() {
    const tagNames = this.post_tags
    this.selectedTagsString = JSON.stringify(tagNames)
  }

  getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
      },
    })
  }

  onCategoryChange() {
    this.categoriesValue = this.businessInfoForm.value.post_category
    this.getDefaultCat()
  }

  getTags() {
    this.businessService.getTags().subscribe({
      next: (res: any) => {
        this.tags = res.data
      },
    })
  }

  getDefaultCat() {
    this.businessService.getDefaultCat(this.categoriesValue).subscribe({
      next: (res: any) => {
        this.selectedDefaultCategories = res.data
      },
    })
  }

  localstoragePostId:any
  getBusinessFormDetails() {
    this.businessService.getBusiness(this.postId).subscribe({
      next: (res) => {
        this.businessFormDetails = res.data
        this.localstoragePostId = this.localStorageService.getData("postId")
        console.log(this.businessFormDetails)
      },
    })
  }

  addBusiness(val?: any) {
    const body = {
      post_title: this.businessInfoForm.value.post_title,
      contact_phone: parseInt(
        this.businessInfoForm.value.contact_phone?.e164Number,
      ),
      business_email: this.businessInfoForm.value.business_email,
      post_category: this.categoriesValue.join(','),
      default_category: this.businessInfoForm.value.default_category,
      latitude: this.latitude,
      longitude: this.longitude,
      city: this.city,
      region: this.state,
      country: this.country,
      zip: this.zipcode,
      post_content: this.businessInfoForm.value.post_content,
      website: this.businessInfoForm.value.website,
      tags: this.selectedTagsString,
    }
    this.businessService.addBusiness(body).subscribe({
      next: (res) => {
        this.addBusinessFormData = res
        this.postId = res.post_id
        this.businessService.storePostId.next(this.postId)
        this.localStorageService.saveData('postId', this.postId)
        this.getBusinessFormDetails()
        this.router.navigate(['/list-business/add-subsciption-details', this.postId])
        Swal.fire({
          toast: true,
          text: 'Business Information added successfully!',
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      },
    })
  }
}
