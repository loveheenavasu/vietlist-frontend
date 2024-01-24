import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatDialog} from '@angular/material/dialog'
import { ForgotPasswordComponent } from '../public-api'
import { NgFor, NgIf } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { FormControlValidationDirective } from '@vietlist/shared'
import { AuthService } from '../service/auth.service'
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
    FormControlValidationDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup;
 public isHidePassword: boolean = false;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder
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
      this.authService.login(this.loginForm.value).subscribe({
        next: (res:any) => {
          console.log("form-data:-", res)
        }, error: (err:any) => {
          console.log(err, "error")
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
