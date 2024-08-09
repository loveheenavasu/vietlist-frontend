import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms'
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { LocalStorageService, FullPageLoaderService } from '@vietlist/shared'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
  NgxIntlTelInputModule,
} from 'ngx-intl-tel-input-gg'
import { ProfileService } from '../../service/profile.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { Country } from 'ngx-intl-tel-input/lib/model/country.model'

@Component({
  selector: 'app-billing-address',
  standalone: true,
  imports: [
    AutocompleteComponent,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule,
    LoaderComponent,
  ],
  templateUrl: './billing-address.component.html',
  styleUrl: './billing-address.component.scss',
})
export class BillingAddressComponent {
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]

  public state: any
  public country: any
  public city: any
  public zipcode: any
  public files: File[] = []
  public fullAddress: any
  public imageName: any
  public uploadMediaUrl: any
  public isFilesPresent: boolean = false
  public display: any
  public zoom = 6
  public selectedTagsString = ''
  public street = ''
  public billingInfo: FormGroup
  public contact_details: any
  public isLoader: boolean = false
  @ViewChild('phoneEle') phoneEle: any
  selectedCountry: CountryISO = CountryISO.UnitedStates

  constructor(
    private _formBuilder: FormBuilder,
    private businessService: BusinessService,
    private localStorageService: LocalStorageService,
    private fullPageLoader: FullPageLoaderService,
    private cd: ChangeDetectorRef,
    private profileServie: ProfileService,
  ) {
    this.billingInfo = this._formBuilder.group({
      pmpro_bfirstname: ['', Validators.required],
      pmpro_blastname: ['', Validators.required],
      other_email_addresses: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      company_id: ['', Validators.required],
      company: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getBillingDetails()
  }

  public getAddress(place: any) {
    console.log(place, 'plaaaaaaadkdnkdkdknkn')
    console.log(place)
    this.fullAddress = place.formatted_address
    this.street = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.forEach((element: any) => {
      element.types.forEach((type: any) => {
        if (type == 'country') {
          this.country = element.short_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.short_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.short_name
        }
      })
    })

    this.cd.detectChanges()
  }

  public addBillingAddress() {
    this.isLoader = true
    const body = {
      pmpro_bfirstname: this.billingInfo.value.pmpro_bfirstname,
      pmpro_blastname: this.billingInfo.value.pmpro_blastname,
      pmpro_baddress1: this.street,
      pmpro_bcity: this.city,
      pmpro_bcountry: this.country,
      pmpro_bstate: this.state,
      pmpro_bzipcode: this.zipcode,
      pmpro_bphone: parseInt(this.contact_details?.e164Number),
      company: this.billingInfo.value.company,
      company_id: this.billingInfo.value.company_id,
      other_email_addresses: this.billingInfo.value.other_email_addresses,
    }
    console.log(body)
    this.profileServie.setBillingAddress(body).subscribe({
      next: (res: any) => {
        this.isLoader = false
        this.getBillingDetails()
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
      error: (err) => {},
    })
  }

  setCountryByDialCode(dialCode: string) {
    dialCode = dialCode.replace('+', '')
    const allCountries = this.phoneEle.allCountries
    const country = allCountries.find((c: Country) => c.dialCode === dialCode)

    if (country) {
      this.selectedCountry = country.iso2 as CountryISO
      this.cd.detectChanges()
    }
  }

  getBillingDetails() {
    this.fullPageLoader.showLoader()
    this.profileServie.getBillingAddress().subscribe({
      next: (res: any) => {
        this.fullPageLoader.hideLoader()
        this.billingInfo.patchValue({
          pmpro_bfirstname: res.data.pmpro_bfirstname || '', // Assign the value from the response or an empty string if not available
          pmpro_blastname: res.data.pmpro_blastname || '', // Assign the value from the response or an empty string if not available
          other_email_addresses: res.data.other_email_addresses || '', // Assign the value from the response or an empty string if not available
          company_id: res.data.company_id || '', // Assign the value from the response or an empty string if not available
          company: res.data.company || '', // Assign the value from the response or an empty string if not available
        })
        ;(this.state = res.data.pmpro_bstate),
          (this.country = res.data.pmpro_bcountry),
          (this.contact_details = res.data.pmpro_bphone),
          (this.street = res.data.pmpro_baddress1),
          (this.city = res.data.pmpro_bcity),
          (this.zipcode = res.data.pmpro_bzipcode)
      },
    })
  }
}
