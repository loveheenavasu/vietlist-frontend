import { FormControlValidationDirective, matchValidator, Roles } from '@vietlist/shared'
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
import { FullPageLoader } from 'src/app/common-ui/full-page-loader/fullpage-loader'

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
  /**
   * @signupform
   */
  public signupForm: FormGroup
  public business_type = new FormControl('')
  public contact_details = new FormControl('')

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.signupForm = this.fb.nonNullable.group({
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
      validators: matchValidator('password', 'confirm_password')

    });
  
  }

  ngOnInit() {
    this.selectedSignupType = this.defaultSelectedRole
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
      return passwordControl.value !== confirmPasswordControl.value;
    }
  
    return false;
  
  }

  public handleRegistrationSubmission() {
    const body = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      business_type: this.signupForm.value.business_type,
      email: this.signupForm.value.email,
      first_name: this.signupForm.value.first_name,
      last_name: this.signupForm.value.last_name,
      confirm_password: this.signupForm.value.confirm_password,
      contact_details: this.signupForm.value.contact_details,
      role: this.selectedSignupType,
      term_and_condition: this.term_and_condition.value,
    }

    if (this.signupForm.valid && this.term_and_condition) {
      if (this.selectedSignupType === this.userRole.businessOwner) {
        body['business_type'] = this.business_type.value
        body['contact_details'] = this.contact_details.value
      }
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



  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control:any = this.signupForm.get('password');
        const matchingControl:any = this.signupForm.get('confirm_password');
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
