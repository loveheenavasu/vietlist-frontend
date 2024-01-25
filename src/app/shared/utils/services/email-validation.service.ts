import { AbstractControl } from '@angular/forms'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
  constructor() {}
  validateEmail(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValid = emailRegex.test(control.value)

    return isValid ? null : { invalidEmail: true }
  }
}
