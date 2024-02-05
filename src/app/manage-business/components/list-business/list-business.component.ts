import { NgClass } from '@angular/common';
import {
  BusinessCategoryResponse,
  TagsResponse,
} from './../../service/business.interface'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { Component } from '@angular/core'
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
// import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { NgSelectModule } from '@ng-select/ng-select'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import { BusinessService } from '../../service/business.service'
import { LocalStorageService } from '@vietlist/shared';
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
    FormsModule,
    ReactiveFormsModule,
    // AutocompleteComponent,
    NgSelectModule,
    NgxIntlTelInputModule,
    NgClass
  ],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss',
})
export class ListBusinessComponent {
  public latitude:any;
  public longitude:any
  public post_tags: any[]=[]
  public separateDialCode = true
  public isFirstStepCompleted:boolean = false
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public defaultCatValue: any
  public businessCat: BusinessCategoryResponse[] = []
  public tags: TagsResponse[] = []
  public isEditable = false
  public businessInfoForm!: FormGroup
  public firstFormGroup!: FormGroup
  public secondFormGroup!: FormGroup
  constructor(
    private _formBuilder: FormBuilder,
    private businessService: BusinessService,
    private localStorageService:LocalStorageService
  ) {
    this.businessInfoForm = this._formBuilder.group({
      post_title: [''],
      contact_phone: [''],
      business_email: [''],
      post_category: [''],
      default_category: [''],
      post_content:[''],
      website:['']
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    })
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    })
    this.businessInfoForm
      .get('post_category')
      ?.valueChanges.subscribe((res) => {
        this.defaultCatValue = res
        if (this.defaultCatValue) {
          this.businessInfoForm
            .get('default_category')
            ?.setValue(this.defaultCatValue)
        }
      })
  }

  ngOnInit() {
    this.getBusinessCat()
    this.getTags()
    this.getBusinessFormDetails()
    console.log(this.post_tags , "postTags")
  }
  state: any
  country: any
  city: any
  zipcode: any

  getAddress(place: any) {
    // Get latitude and longitude
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
      console.log(element , "element")
      element.types.filter((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
          console.log(this.country, ' this.country')
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
          console.log(this.country, ' this.country')
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
          console.log(this.country, ' this.country')
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
          console.log(this.state, ' this.country')
        }

      })
    })
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

  selectedTagsString = ''; // String to store selected tags with commas

  // Rest of your component code

  // Method triggered when selection changes
  onTagSelectionChange() {
   const data = this.post_tags.map(tag => tag.name).join(', ');
   this.selectedTagsString = data.toString()
    console.log(this.selectedTagsString , "tagString")
  }




  getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
        console.log(this.businessCat)
      },
    })
  }

  getTags() {
    this.businessService.getTags().subscribe({
      next: (res: any) => {
        this.tags = res.data
      },
    })
  }

  getBusinessFormDetails(){
    this.businessService.getBusiness().subscribe({
      next:(res)=>{
        console.log(res , "GET")
      }
    })
  }

  addBusiness(val?:any){
    console.log("Hello" , "Hello1233333")
    const body = {
      post_title: this.businessInfoForm.value.post_title,
      contact_phone:  parseInt(this.businessInfoForm.value.contact_phone?.e164Number),
      business_email: this.businessInfoForm.value.business_email,
      post_category: this.businessInfoForm.value.post_category,
      default_category: this.businessInfoForm.value.default_category,
      latitude:this.latitude,
      longitude:this.longitude,
      city:this.city,
      region:this.state,
      country:this.country,
      zip:this.zipcode,
      post_content:this.businessInfoForm.value.post_content,
      website:this.businessInfoForm.value.website,
      tags:this.selectedTagsString,

    }
    this.businessService.addBusiness(body).subscribe({
      next:(res)=>{
      
        console.log(this.isFirstStepCompleted , "response")
      }
    })
  }
}
