import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ForgotPasswordComponent } from '../public-api'
import { NgFor, NgIf } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { FormControlValidationDirective, LocalStorageService } from '@vietlist/shared'
import { AuthService } from '../service/auth.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
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
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isHidePassword: boolean = false;
  public loader: boolean = false;

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
    private localStorage:LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }
  public forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '35%',
    })
  }

  public navigateToRegister() {
    this.router.navigateByUrl('/register')
  }

  public login() {
    if (this.loginForm.valid) {
      this.loader = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.loader = false;
            this.localStorage.saveData('vietlist::session' , res.token)
          Swal.fire({
            toast: true,
            text: 'Login Successfully',
            animation: false,
            icon:'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        }, error: (err: any) => {
          this.loader = false;
          console.log(err, "error")
          Swal.fire({
            toast: true,
            text: err.error.message,
            animation: false,
            icon:'error',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        }
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
