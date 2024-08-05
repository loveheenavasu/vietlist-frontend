import { AddRealEstateBusinessComponent } from './../../../add-real-estate-business/add-real-estate-business.component'
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { ProfileService } from '../../service/profile.service'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService, ProfileMenu, Roles } from '@vietlist/shared'
import { CommonModule, NgIf } from '@angular/common'
import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import Swal from 'sweetalert2'
import { Subject, takeUntil } from 'rxjs'
import { Country } from 'ngx-intl-tel-input-gg/lib/model/country.model'

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgxIntlTelInputModule,
    NgIf,
    ReactiveFormsModule,
    AddRealEstateBusinessComponent,
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfileComponent {
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public realEstateDetails: any
  public isrealEstateDetails: boolean = false
  public email!: string //
  public userName: string = ''
  public last_name: string = ''
  public first_name: string = ''
  public contact_details: any = new FormControl('')
  public userDetails: any
  public isLoginSucess?: any
  public sidebarMenu: ProfileMenu[] = []
  public role = Roles
  private destroy$ = new Subject<void>()
  public business_description = new FormControl('')
  public additionalContact = new FormControl('')
  public isClickedOnCompleteProfile: boolean = false
  public checkBehaviour: any
  selectedCountry: CountryISO = CountryISO.UnitedStates
  @ViewChild('phoneEle') phoneEle: any

  constructor(
    private profileDetail: ProfileService,
    private router: Router,
    private loaderService: FullPageLoaderService,
    private sessionservice: AuthenticationService,
    private cd: ChangeDetectorRef,
  ) {
    this.profileDetail.isProfileComplete.subscribe((res) => {
      this.checkBehaviour = res
    })
  }

  loading = true
  fetchProfileDetail() {
    this.loaderService.showLoader()
    this.profileDetail
      .userDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading = false
          this.loaderService.hideLoader()
          if (res) {
            this.userDetails = res.data.user
            this.getRealEstateUserDetails()
            this.email = res.data.user.user_email
              ? res.data.user.user_email
              : ' '
            this.userName = res.data?.user?.user_nicename
            this.last_name = res.data?.user?.last_name
            this.first_name = res.data?.user?.first_name
            this.setCountryByDialCode(res.data?.user?.country_code)
            this.contact_details = res.data?.user?.contact
          }
        },
        error: (err: any) => {
          this.loading = false
          this.router.navigateByUrl('/login')
        },
      })
  }

  handleUpdateUser() {
    this.loaderService.showLoader()
    const body = {
      user_email: this.email,
      display_user_name: this.userName,
      user_image: '',
      first_name: this.first_name,
      last_name: this.last_name,
      contact: this.contact_details?.nationalNumber,
      country_code: this.contact_details?.dialCode,
    }

    this.profileDetail.userProfileUpdate(body).subscribe({
      next: (res) => {
        this.sessionservice.userDetailResponse.next(res.data.user)
        this.loaderService.hideLoader()
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

  public completeProfile() {
    this.isClickedOnCompleteProfile = true
  }

  setCountryByDialCode(dialCode: string) {
    dialCode = dialCode.replace('+', '')
    console.log(this.phoneEle, 'this.phoneEle')
    const allCountries = this.phoneEle.allCountries
    const country = allCountries.find((c: Country) => c.dialCode === dialCode)

    if (country) {
      this.selectedCountry = country.iso2 as CountryISO
      this.cd.detectChanges()
    }
  }

  public getRealEstateUserDetails() {
    this.profileDetail
      .getRealEstateProfileDetails(this.userDetails?.ID)
      .subscribe({
        next: (res) => {
          this.realEstateDetails = res?.data
          if (!this.realEstateDetails.business_description) {
            this.isrealEstateDetails = false
          } else {
            this.isrealEstateDetails = true
            this.business_description.setValue(
              this.realEstateDetails?.business_description,
            )
            this.additionalContact.setValue(
              this.realEstateDetails?.additional_contact_information,
            )
          }
        },
      })
  }

  public editAdditionalInfo() {
    this.router.navigateByUrl('/complete-profile')
  }

  ngAfterViewInit() {
    this.fetchProfileDetail()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
