import {
  AuthenticationService,
  FormControlValidationDirective,
  LocalStorageService,
  matchValidator,
  Roles,
} from '@vietlist/shared'
import { Router } from '@angular/router'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { AuthService } from '../service/auth.service'
import Swal from 'sweetalert2'
import { LoaderComponent } from 'src/app/common-ui'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg'
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { debounceTime, Subject } from 'rxjs'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'

@Component({
  selector: 'app-register:not(p)',
  standalone: true,
  imports: [
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FormControlValidationDirective,
    LoaderComponent,
    NgClass,
    NgxIntlTelInputModule,
    AutocompleteComponent,
  ],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]

  public defaultSelectedRole = Roles.businessOwner
  public userRole = Roles
  public signupType = [
    { name: 'Business', value: Roles.businessOwner, checked: true },
    { name: 'User', value: Roles.subscriber, checked: false },
    { name: 'Broker', value: Roles.broker, checked: false },
    { name: 'Real Estate', value: Roles.realEstate, checked: false },
  ]
  public term_and_condition = new FormControl(false, Validators.required)
  public selectedSignupType: any
  public loader: boolean = false
  public isHidePassword: boolean = false
  public isHideConfirmPassword: boolean = false
  public isSubmitted: boolean = false
  public rolesArray = (Object.keys(Roles) as Array<keyof typeof Roles>).map(
    (key) => ({
      value: Roles[key],
      label: this.formatLabel(key),
    }),
  )
  public signupForm: FormGroup
  public business_type = new FormControl('')
  public contact_details = new FormControl()

  /**
   *
   * @param router
   * @param fb
   * @param authService
   * @param localStorageServce
   * @param sessionServce
   */
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageServce: LocalStorageService,
    private sessionServce: AuthenticationService,
    private profileService: ProfileService,
  ) {
    this.signupForm = this.fb.nonNullable.group(
      {
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*#?&]+$/,
            ),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        confirm_password: ['', [Validators.required]],
        role: [''],
      },
      {
        validators: matchValidator('password', 'confirm_password'),
      },
    )

    // this.contact_details!.valueChanges.pipe(
    //   throttleTime(200),
    //   tap((x)=>{
    //     if(x?.number){
    //       let nums = x.number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})/);
    //       if(nums) {
    //         let masked = !nums[2] ? nums[1] : '' + nums[1] + ' ' + nums[2] + (nums[3] ? ' ' + nums[3] : '') + (nums[4] ? ' ' + nums[4] : '');
    //         this.contact_details!.setValue(masked);
    //       }
    //     }

    // })).subscribe((x: any) => { });
  }
  direction: string = ''

  ngOnInit() {
    this.selectedSignupType = Roles.businessOwner
  }

  public handleSignupTypeSelection(value: any) {
    this.selectedSignupType = value
  }

  public navigateToLogin() {
    this.router.navigateByUrl('/login')
  }

  public passwordsMismatch() {
    const passwordControl = this.signupForm.get('password')
    const confirmPasswordControl = this.signupForm.get('confirm_password')
    if (
      passwordControl &&
      confirmPasswordControl &&
      confirmPasswordControl.touched &&
      confirmPasswordControl.dirty
    ) {
      return passwordControl.value !== confirmPasswordControl.value
    }

    return false
  }

  public allowNotification() {
    const body = {
      Login: 1,
      Subscription: 1,
      delete_account: 1,
      business_listing: 1,
    }

    this.profileService.allowNotificationSetting(body).subscribe({
      next: (res) => {},
    })
  }

  getAddress(place: any) {
    this.isSubmitted = false
    this.direction = place.formatted_address
  }

  public handleRegistrationSubmission() {
    this.isSubmitted = true

    const body: { [key: string]: any } = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      business_type: this.signupForm.value.business_type,
      email: this.signupForm.value.email,
      first_name: this.signupForm.value.first_name,
      last_name: this.signupForm.value.last_name,
      confirm_password: this.signupForm.value.confirm_password,
      contact_details: this.contact_details?.value?.nationalNumber,
      role: this.selectedSignupType,
      term_and_condition: this.term_and_condition.value,
      country_code: this.contact_details.value?.dialCode,
    }
    if (this.signupForm.valid && this.term_and_condition) {
      if (this.selectedSignupType === this.userRole.businessOwner) {
        body['business_type'] = this.business_type.value
        body['country_code'] = this.contact_details.value.dialCode
      }
      if (
        this.selectedSignupType === this.userRole.broker ||
        this.selectedSignupType === this.userRole.realEstate
      ) {
        body['address'] = this.direction
      }

      this.loader = true
      this.authService.register(body).subscribe({
        next: (res) => {
          this.loader = false
          this.sessionServce.userRole.next(res?.data?.user?.user_role)
          if (res) {
            this.localStorageServce.saveData(
              'vietlist::user',
              JSON.stringify(res?.data?.user),
            )
            this.localStorageServce.saveData(
              'loginInfo',
              JSON.stringify(res.data.user),
            )
            this.sessionServce.setSubscriptonStatus(res.data.user.status)
          }
          Swal.fire({
            toast: true,
            text: 'Successfully registered',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          if (res) {
            if (res.data.user.user_role == Roles.businessOwner) {
              this.router.navigateByUrl('/subscription-plans')
              this.sessionServce.setAuthenticationStatusTrue(res.data.token)
            } else {
              this.router.navigateByUrl('/login')
            }
            if (
              res.data.user.user_role == Roles.subscriber ||
              Roles.broker ||
              Roles.realEstate
            ) {
              this.sessionServce.setAuthenticationStatusTrue(res.data.token)
              this.router.navigateByUrl('/manage-profile')
            }
            // if (
            //   res.data.user.user_role == Roles.broker ||
            //   res.data.user.user_role == Roles.realEstate
            // ) {
            //   this.sessionServce.setAuthenticationStatusTrue(res.data.token)
            //   this.router.navigateByUrl('/')
            // }
            this.allowNotification()
          }
        },
        error: (err) => {
          this.loader = false
        },
      })
    } else {
      Swal.fire({
        toast: true,
        text: 'Please fill the form',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  }

  public changeSignupType() {
    this.signupForm.reset()
  }

  public hidePassword() {
    if (this.isHidePassword) {
      this.isHidePassword = false
    } else {
      this.isHidePassword = true
    }
  }

  public hideConfirmPassword() {
    this.isHideConfirmPassword = !this.isHideConfirmPassword
  }

  public formatLabel(key: keyof typeof Roles): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  }

  public onlyNumberKey(event: any) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57
  }
}
