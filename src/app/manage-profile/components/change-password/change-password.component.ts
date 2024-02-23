import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import {
  FullPageLoaderService,
  AuthenticationService,
  FormControlValidationDirective,
} from '@vietlist/shared'
import { matchValidator } from 'src/app/auth/register/validator'

import Swal from 'sweetalert2'

import { ProfileService } from '../../service/profile.service'

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    FormControlValidationDirective,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  public email: string //
  public isHidePassword: boolean = false
  public changePassword: FormGroup

  /**
   *
   * @param profileDetail
   * @param router
   * @param loaderService
   */
  constructor(
    private profileDetail: ProfileService,
    private loaderService: FullPageLoaderService,
    private fb: FormBuilder,
    private sessionservice: AuthenticationService,
    private router: Router,
  ) {
    this.changePassword = this.fb.group(
      {
        old_password: ['', Validators.required],
        new_password: ['', Validators.required],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: matchValidator('new_password', 'confirm_password'),
      },
    )

    const data = this.sessionservice.getUserdata()
    this.email = data?.user_email
  }

  ngOnInit() {}

  public hidePassword() {
    if (this.isHidePassword) {
      this.isHidePassword = false
    } else {
      this.isHidePassword = true
    }
  }

  handleChangePassword() {
    this.loaderService.showLoader()
    const body = {
      email: this.email,
      old_password: this.changePassword.value.old_password,
      new_password: this.changePassword.value.new_password,
    }
    this.profileDetail.changePasswrd(body).subscribe({
      next: (res) => {
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
      error: (err) => {
        this.loaderService.hideLoader()
      },
    })
  }

  public isHideConfirmPassword: boolean = true

  hideConfirmPassword() {
    this.isHideConfirmPassword = !this.isHideConfirmPassword
  }
}
