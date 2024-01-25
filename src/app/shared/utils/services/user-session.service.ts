import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  public loginToken = new BehaviorSubject<any>('');
  public isSuccessLogin = new BehaviorSubject<any>('')

  constructor() {
  }



}
