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
  ]
  public term_and_condition = new FormControl(false, Validators.required)
  public selectedSignupType: any
  public loader: boolean = false
  public isHidePassword: boolean = false
  public isHideConfirmPassword: boolean = false
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
  ) {

    this.signupForm = this.fb.nonNullable.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
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
  }

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

  public handleRegistrationSubmission() {
    const formattedPhoneNumber = this.contact_details?.value?.e164Number?.split(
      this.contact_details?.value?.dialCode,
    )
    const body = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      business_type: this.signupForm.value.business_type,
      email: this.signupForm.value.email,
      first_name: this.signupForm.value.first_name,
      last_name: this.signupForm.value.last_name,
      confirm_password: this.signupForm.value.confirm_password,
      contact_details: parseInt(
        formattedPhoneNumber?.length ? formattedPhoneNumber[1] : '',
      ),
      role: this.selectedSignupType,
      term_and_condition: this.term_and_condition.value,
      country_code: this.contact_details.value?.dialCode,
    }
    if (this.signupForm.valid && this.term_and_condition) {
      if (this.selectedSignupType === this.userRole.businessOwner) {
        body['business_type'] = this.business_type.value
        body['contact_details'] = parseInt(
          this.contact_details.value?.e164Number,
        )
       body['country_code'] =  this.contact_details.value.dialCode
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
            if (res.data.user.user_role == Roles.subscriber) {
              this.sessionServce.setAuthenticationStatusTrue(res.data.token)
              this.router.navigateByUrl('/manage-profile')
            }
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
