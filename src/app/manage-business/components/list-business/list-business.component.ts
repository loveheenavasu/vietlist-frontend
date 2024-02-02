import { BusinessCategoryResponse } from './../../service/business.interface'
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
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { NgSelectModule } from '@ng-select/ng-select'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import { BusinessService } from '../../service/business.service'
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
    AutocompleteComponent,
    NgSelectModule,
    NgxIntlTelInputModule,
  ],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss',
})
export class ListBusinessComponent {
  selectedCityIds!: string[]
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public defaultCatValue: any
  public businessCat: BusinessCategoryResponse[] = []
  public isEditable = false
  public businessInfoForm!: FormGroup
  public firstFormGroup!: FormGroup
  public secondFormGroup!: FormGroup
  constructor(
    private _formBuilder: FormBuilder,
    private businessService: BusinessService,
  ) {
    this.businessInfoForm = this._formBuilder.group({
      post_title: [''],
      contact_phone: [''],
      business_email: [''],
      post_category: [''],
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
        console.log(this.defaultCatValue, 'Hello123123')
      })
  }

  ngOnInit() {
    this.getBusinessCat()
  }
  state: any
  country: any
  city: any
  zipcode: any

  getAddress(place: any) {
    // Get latitude and longitude
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()

    console.log('Latitude:', latitude)
    console.log('Longitude:', longitude)
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
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
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555,
  }
  zoom = 6

  /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*/
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON()
  }

  /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON()
  }

  cities2 = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' },
  ]

  getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
        console.log(this.businessCat)
      },
    })
  }
}
