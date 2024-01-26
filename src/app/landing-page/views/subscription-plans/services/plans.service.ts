import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints, GenericHelper } from '@vietlist/shared';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http:HttpClient) { }

  public subscriptionPlan(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SubscriptionPlan)
    return this.http.get<any>(endpoint)
  }
 
}
