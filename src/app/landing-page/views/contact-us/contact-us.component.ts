import { HomepageService } from './../service/homepage.service';
import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input-gg';

import Swal from 'sweetalert2';
import { ForgotPasswordComponent } from '../../../auth';
import { AuthService } from '../../../auth/service/auth.service';
import { LocalStorageService, AuthenticationService, Roles, UserStatus } from '../../../shared/utils';
import { AutocompleteComponent } from '../../../shared/utils/googleaddress';
import { LoaderComponent } from 'src/app/common-ui';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule , FormsModule ,NgxIntlTelInputModule ,AutocompleteComponent,LoaderComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  public contactus!: FormGroup
  public loader: boolean = false
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public getstreet:any
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public street:any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public latitude: number = 0
  public longitude: number = 0
  public fullAddress:any
  /**
   *
   * @param dialog
   * @param router
   * @param authService
   * @param fb
   */

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private homepage: HomepageService,
    private cd:ChangeDetectorRef
  ) {

    this.contactus = this.fb.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      messages:['', Validators.required]
    })
  }
 
  onStreetChange(value: any) {
   this.getstreet = value?.value;
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

  }



  public submit() {
    if (this.contactus.valid) {
      this.loader = true
      const body  = {
        name:this.contactus.value.name,
        phone_number:this.contactus.value.name,
        messages:this.contactus.value.messages,
        email:this.contactus.value.email,
        address:this.fullAddress
      }
      this.homepage.contactus(body).subscribe({
        next: (res: any) => {
          this.loader = false
          this.contactus.reset()
          this.street = ''
          this.fullAddress = ''
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
        },
        error: (err: any) => {
          this.loader = false
        },
      })
    }
  }

}
