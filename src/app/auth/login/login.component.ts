import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ForgotPasswordComponent } from '../public-api'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    public dialog: MatDialog,
    public router: Router,
  ) {}
  public forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '35%',
    })
  }

  public navigateToRegister() {
    this.router.navigateByUrl('/register')
  }
}
