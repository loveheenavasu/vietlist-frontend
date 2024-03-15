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

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule , FormsModule ,NgxIntlTelInputModule ,AutocompleteComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  public loginForm!: FormGroup
  public loader: boolean = false
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
    private authenticationService: AuthenticationService,
    private cd:ChangeDetectorRef
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  screensize: any = '35%'
  dialogWidth: any
  height: any
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screensize = event.target.innerWidth
  }

  public forgotPassword() {
    if (this.screensize > 720) {
      this.dialogWidth = '45%'
    } else if (this.screensize < 720) {
      this.dialogWidth = '90%'
      this.height = '45%'
    }

    this.dialog.open(ForgotPasswordComponent, {
      width: this.dialogWidth,
      height: this.height,
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

  }

  public navigateToRegister() {
    this.router.navigateByUrl('/register')
  }

  public login() {
    if (this.loginForm.valid) {
      this.loader = true
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.loader = false
          this.authenticationService.userRole.next(res?.data?.user?.user_role)
          this.authenticationService.setAuthenticationStatusTrue(res.data.token)
          this.localStorage.saveData('loginInfo', JSON.stringify(res.data.user))
          this.authenticationService.setSubscriptonStatus(res.data.user.status)
          if (
            res.data.user.user_role == Roles.businessOwner &&
            res.data.user.status == 'inactive'
          ) {
            this.router.navigateByUrl('/subscription-plans')
          } else if (
            res.data.user.user_role == Roles.businessOwner &&
            res.data.user.status == UserStatus.Active
          ) {
            this.router.navigateByUrl('/manage-profile')
          } else if (res.data.user.user_role == Roles.subscriber) {
            this.router.navigateByUrl('/manage-profile')
          }

          Swal.fire({
            toast: true,
            text: 'Login Successfully',
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
