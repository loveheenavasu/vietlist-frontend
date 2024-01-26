import {
  EmailValidationService,
  FormControlValidationDirective,
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
import { matchValidator } from 'src/app/auth/register/validator';

@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public selectedSignupType = Roles.businessOwner
  public role = Roles
  public showTermsError: boolean = false
  public signupForm: FormGroup
  public signupType = [
    { name: 'Business', value: Roles.businessOwner, checked: true },
    { name: 'User', value: Roles.subscriber, checked: false },
  ]
  public term_and_condition = new FormControl(false, Validators.required)
  public selectedVal: any
  public loader: boolean = false
  public isHidePassword: boolean = false
  public isHideConfirmPassword: boolean = false
  public rolesArray = (Object.keys(Roles) as Array<keyof typeof Roles>).map(
    (key) => ({
      value: Roles[key],
      label: this.formatLabel(key),
    }),
  )

  public selectedRole: string = '' // Set a default value if needed
  public usersignupForm: FormGroup
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      business_type: ['', Validators.required],
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

      role: [''],
      contact_details: ['', Validators.required],
    }, {
      validators: matchValidator('password', 'confirm_password')
    });
    this.usersignupForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
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

      role: [''],

    }, {
      validators: matchValidator('password', 'confirm_password')
    });
    console.log(this.rolesArray)
  }

  ngOnInit() {
    this.selectedVal = this.selectedSignupType
    if (this.selectedVal == 'user') {
      this.router.navigateByUrl('/user-registration')
    }
  }

  public selectType(value: any) {
    this.selectedVal = value
  }

  public navigateToLogin() {
    this.router.navigateByUrl('/login')
  }

  passwordsMismatch() {
    const passwordControl = this.signupForm.get('password')
    const confirmPasswordControl = this.signupForm.get('confirm_password')
    return (
      passwordControl &&
      confirmPasswordControl &&
      confirmPasswordControl.touched &&
      confirmPasswordControl.dirty &&

      passwordControl.value !== confirmPasswordControl.value
    )
  }

  userConfirmPassword() {
    const passwordControl = this.usersignupForm.get('password')
    const confirmPasswordControl = this.usersignupForm.get('confirm_password')
    return (
      passwordControl &&
      confirmPasswordControl &&
      confirmPasswordControl.touched &&
      confirmPasswordControl.dirty &&

      passwordControl.value !== confirmPasswordControl.value
    )
  }
  businessbody: any
  public submitRegistration() {

    const body = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      business_type: this.signupForm.value.business_type,
      email: this.signupForm.value.email,
      first_name: this.signupForm.value.first_name,
      last_name: this.signupForm.value.last_name,
      confirm_password: this.signupForm.value.confirm_password,
      contact_details: this.signupForm.value.contact_details,
      role: this.selectedVal,
      term_and_condition: this.term_and_condition.value,
      // ...(this.selectedVal === this.role.subscriber
      //   ? { role: this.signupForm.value.role }
      //   : {}),
    }


    console.log(body, 'body')
    if (this.signupForm.valid && this.term_and_condition) {
      this.loader = true
      this.authService.register(body).subscribe({
        next: (res) => {
          this.loader = false
          console.log(res)
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
            this.router.navigateByUrl('/login')
          }
          console.log(res)
        },
        error: (err) => {
          console.log(err.error.message, 'Error')
          this.loader = false
          Swal.fire({
            toast: true,
            text: err.error.message,
            animation: false,
            icon: 'error',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
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

  public usersubmitRegistration() {

    const body
      = {
      username: this.usersignupForm.value.username,
      password: this.usersignupForm.value.password,

      email: this.usersignupForm.value.email,
      first_name: this.usersignupForm.value.first_name,
      last_name: this.usersignupForm.value.last_name,
      confirm_password: this.usersignupForm.value.confirm_password,

      role: this.selectedVal,
      term_and_condition: this.term_and_condition.value,
      // ...(this.selectedVal === this.role.subscriber
      //   ? { role: this.signupForm.value.role }
      //   : {}),
    }


    console.log(body, 'body')
    if (this.usersignupForm.valid && this.term_and_condition) {
      this.loader = true
      this.authService.register(body).subscribe({
        next: (res) => {
          this.loader = false
          console.log(res)
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
            this.router.navigateByUrl('/login')
          }
          console.log(res)
        },
        error: (err) => {
          console.log(err.error.message, 'Error')
          this.loader = false
          Swal.fire({
            toast: true,
            text: err.error.message,
            animation: false,
            icon: 'error',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
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
    if (this.isHideConfirmPassword) {
      this.isHideConfirmPassword = false
    } else {
      this.isHideConfirmPassword = true
    }
  }

  formatLabel(key: keyof typeof Roles): string {
    // Example: Convert "businessOwner" to "Business Owner"
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
