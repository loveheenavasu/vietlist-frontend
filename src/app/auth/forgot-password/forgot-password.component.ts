import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { FormControlValidationDirective } from 'src/app/shared/utils/directives/control-validation.directive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule,
    FormControlValidationDirective,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup

  constructor(public matDialogRef: MatDialogRef<ForgotPasswordComponent>, public dialog: MatDialog, private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ["", Validators.required]
    })
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

  public forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          console.log("email-sent", res)
        },
        error: (err) => {
          console.log("forgot-api-error", err)
        }
      })
    }
  }

}
