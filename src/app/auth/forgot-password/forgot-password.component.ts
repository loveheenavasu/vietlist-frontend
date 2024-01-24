import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { FormControlValidationDirective } from 'src/app/shared/utils/directives/control-validation.directive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoaderComponent } from 'src/app/common-ui';
import Swal from 'sweetalert2'
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule,
    FormControlValidationDirective,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    NgIf,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup
  public loader: boolean = false;

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
      this.loader = true
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res: any) => {
          this.loader = false;
          console.log("email-sent", res)
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
        },
        error: (err: any) => {
          this.loader = false;
          console.log("forgot-api-error", err)
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
        }
      })
    }
  }

}
