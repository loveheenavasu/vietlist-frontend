import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() { }

  public getValidationMessage(validationId: any): any {
    return this.errorMessage[validationId]
  }

  private errorMessage: any = {
    'business-required-msg': 'Business name is required',
    'email-required-msg': 'Email is required',
    'password-required-msg': 'Password is required',
    'confirm-password-required-msg': 'Confirm password does not match',
    'buisness-type-msg': 'Buisness type is required',
    'role-type-msg': 'Role type is required',
    'buisnessname-required-msg': 'Buisness name is required',
    'username-required-msg': 'Username or Email is required',
    'invalid-email-msg': 'Email is invalid',
    'first-name-msg': 'First name is required',
    'last-name-msg': 'Last name is required',
    'contact-required-msg': 'Contact number is required',
    'list-name-msg': 'Lisiting Tiltle is required',
    'full-name-msg': 'Full Name is required',
  }
}
