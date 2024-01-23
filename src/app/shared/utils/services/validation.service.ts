import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public getValidationMessage(validationId:any):any{
    return this.errorMessage[validationId]
  }

  private errorMessage:any = {
    'buisnessname-required-msg' : 'Buisness name is required'
  }
}
