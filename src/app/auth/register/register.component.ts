import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public selectedSignupType: any = 'buisness'
  public signupType = [
    { name: 'Buisness', value: 'buisness', checked: true },
    { name: 'User', value: 'user', checked: false },
  ]

  public selectedVal: any

  constructor(public router:Router) {}

  ngOnInit() {
    this.selectedVal = this.selectedSignupType
  }

  public selectType(value: any) {
    this.selectedVal = value
  }

  public navigateToLogin(){
  this.router.navigateByUrl('/login')
  }
}
