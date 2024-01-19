import { Component } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public matDialogRef: MatDialogRef<LoginComponent>) {}
  public close() {
    this.matDialogRef.close()
  }
}
