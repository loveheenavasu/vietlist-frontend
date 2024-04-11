import { Router } from '@angular/router'
import { Component, HostListener } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { NgFor, NgIf } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import {
  FormControlValidationDirective,
  LocalStorageService,
  Roles,
  UserStatus,
} from '@vietlist/shared'
import { AuthService } from '../service/auth.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { AuthenticationService } from '@vietlist/shared'
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'
import { of } from 'rxjs'

@Component({
  selector: 'app-login',
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm!: FormGroup
  public isHidePassword: boolean = false
  public loader: boolean = false

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
          if(res){
            this.authenticationService.notificationAUth.next(true)
          }
         
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

  public hidePassword() {
    if (this.isHidePassword) {
      this.isHidePassword = false
    } else {
      this.isHidePassword = true
    }
  }
}
