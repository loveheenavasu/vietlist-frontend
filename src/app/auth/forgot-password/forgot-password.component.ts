import { NgIf, CommonModule } from '@angular/common'
import { LoaderComponent } from './../../common-ui/loader/loader.component'
import { Router } from '@angular/router'
import { Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

import { FormControlValidationDirective } from 'src/app/shared/utils/directives/control-validation.directive'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from '../service/auth.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormControlValidationDirective,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    NgIf,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  public forgotPasswordForm!: FormGroup
  public isHidePassword: boolean = false
  public isOtpReceived: boolean = false
  public isOtpValidate: boolean = false
  public otp = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{4}$'), // Pattern to allow only 4 digits
  ])
  public otpToken: any
  public password = new FormControl('', Validators.required)
  public hideOTP: boolean = true
  public loader: boolean = false
  public isResentOTP: boolean = false

  /**
   * 
   * @param matDialogRef 
   * @param dialog 
   * @param router 
   * @param authService 
   * @param fb 
   */
  constructor(
    public matDialogRef: MatDialogRef<ForgotPasswordComponent>,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    })
  }

  ngOnInit(){
    this.updateSize()
  }

  public close() {
    this.matDialogRef.close()
  }

  public navigateToLogin() {
    this.close()
    this.router.navigateByUrl('/login')
  }

  public navigateToRegister() {
    this.close()
    this.router.navigateByUrl('/register')
  }

  public getOtp(isResendOTP: boolean) {
    if (this.forgotPasswordForm.valid) {
      if (isResendOTP == false) {
        this.loader = true
      }
      this.authService.sendOtp(this.forgotPasswordForm.value).subscribe({
        next: (res: any) => {
          this.loader = false
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
          if (res) {
            this.isOtpReceived = true
            this.hideOTP = false
          }
        },
        error: (err: any) => {
          this.loader = false
        },
      })
    } else {
      Swal.fire({
        toast: true,
        text: 'Email is required',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  }

  public forgotPassword() {
    const body = {
      email: this.forgotPasswordForm.value.email,
      otp: this.otp.value,
    }
    this.loader = true
    this.authService.forgotPassword(body).subscribe({
      next: (res: any) => {
        this.otpToken = res.token
        this.hideOTP = false
        if (res) {
          this.loader = false
          this.hideOTP = true // Hide OTP input
          this.isOtpValidate = true
        }
      },
      error: (err: any) => {
        this.loader = false
      },
    })
  }

  public resetPassword() {
    const body = {
      email: this.forgotPasswordForm.value.email,
      token: this.otpToken,
      password: this.password.value,
    }
    this.loader = true
    this.authService.resetPassword(body).subscribe({
      next: (res: any) => {
        this.loader = false
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
        this.matDialogRef.close()
        this.router.navigateByUrl('/login')
      },
      error: (err: any) => {
        this.loader = false
      },
    })
  }

  public onlyNumberKey(event: any) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57
  }

  public onOtpInput() {
    const inputValue: any = this.otp.value
    const numericValue = inputValue.replace(/[^0-9]/g, '') // Remove non-numeric characters

    if (numericValue.length > 4) {
      this.otp.setValue(numericValue.substring(0, 4)) // Limit to 4 digits
    }
  }

  public hidePassword() {
    if (this.isHidePassword) {
      this.isHidePassword = false
    } else {
      this.isHidePassword = true
    }
  }

 public validateEmailFormat() {
    const emailControl: any = this.forgotPasswordForm.get('email')
    if (emailControl.touched && emailControl.value) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const isValid = emailPattern.test(emailControl.value)

      if (!isValid) {
        emailControl.setErrors({ email: true })
      } else {
        emailControl.setErrors(null)
      }
    }
  }

  public updateSize(){
    this.matDialogRef.updateSize('600px' , '330px')
  }
}
