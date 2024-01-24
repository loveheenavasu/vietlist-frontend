
import { FormControlValidationDirective, Roles } from '@vietlist/shared'
import { Router } from '@angular/router'
import { NgFor, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2'
import { LoaderComponent } from 'src/app/common-ui'


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
    FormControlValidationDirective,
    LoaderComponent
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
public terms = new FormControl(false, Validators.required)
  public selectedVal: any
  public roles = Roles;
  public rolesArray = Object.entries(this.roles); // Convert roles object to an array of key-value pairs
  public loader:boolean=false;
  
  rolesObjects: { key: string, value: string }[] = [];

  public selectedRole: string = ''; // Set a default value if needed

  public signupForm: FormGroup

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService:AuthService
  ) {
    this.signupForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      business_type: ['', Validators.required],
      email: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    })
    this.rolesObjects = this.rolesArray.map(role => ({ key: role[0], value: role[1] }));

  }

  ngOnInit() {
    this.selectedVal = this.selectedSignupType
    if(this.selectedVal == 'user'){
      this.router.navigateByUrl('/user-registration')
    }
   console.log(this.rolesObjects )
  }

  public selectType(value: any) {
    this.selectedVal = value

    
  }

  public navigateToLogin() {
    this.router.navigateByUrl('/login')
  }

  passwordsMismatch() {
    const passwordControl = this.signupForm.get('password');
    const confirmPasswordControl = this.signupForm.get('confirmPassword');

    return (
      passwordControl &&
      confirmPasswordControl &&
      confirmPasswordControl.touched &&
      confirmPasswordControl.dirty &&
      passwordControl.value !== confirmPasswordControl.value
    );
  }


  public submitRegistration() {
    const body = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      business_type: this.signupForm.value.business_type,
      email: this.signupForm.value.email,
      confirmPassword: this.signupForm.value.confirmPassword,
      ...(this.selectedVal === 'business' ? { role: this.signupForm.value.role } : {})
    };
    this.loader = true;
    console.log(body , "body")
    this.authService.register(body).subscribe({
      next:(res)=>{
        this.loader=false
        console.log(res)
        Swal.fire({
          toast: true,
          text: 'Successfully registered',
          animation: false,
          icon:'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        if(res){
          this.router.navigateByUrl('/login')
        }
        console.log(res)
      },error:(err)=>{
        console.log(err.error.message , "Error")
        this.loader = false
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

  public changeSignupType() {
    this.signupForm.reset();
  }
}
