import { FormControlValidationDirective } from '../../shared/utils/directives/control-validation.directive';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
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
    FormControlValidationDirective
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

  public signupForm:FormGroup
  constructor(public router:Router , private fb:FormBuilder) {
    this.signupForm = this.fb.group({
      userName:['' , Validators.required]
    })
  }

  ngOnInit() {
    this.selectedVal = this.selectedSignupType
  }

  public selectType(value: any) {
    this.selectedVal = value
  }

  public navigateToLogin(){
  this.router.navigateByUrl('/login')
  }

  public submitRegistration(){

  }
}
