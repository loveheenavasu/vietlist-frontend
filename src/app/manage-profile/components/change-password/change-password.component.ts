import { CommonModule, NgIf } from '@angular/common'
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
  ProfileMenu,
  FullPageLoaderService,
  AuthenticationService,
} from '@vietlist/shared'
import Swal from 'sweetalert2'

import { ProfileService } from '../../service/profile.service'

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
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
    private router: Router,
    private loaderService: FullPageLoaderService,
    private fb: FormBuilder,
    private sessionservice: AuthenticationService,
  ) {
    this.changePassword = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
    })
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
    console.log('check update', body)
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
      error: (err) => {},
    })
  }
}
