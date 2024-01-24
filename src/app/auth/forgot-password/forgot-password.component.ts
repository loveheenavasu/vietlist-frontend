import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(
    public matDialogRef: MatDialogRef<ForgotPasswordComponent>,
    public dialog: MatDialog,
    private router: Router,
  ) {}

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
}
