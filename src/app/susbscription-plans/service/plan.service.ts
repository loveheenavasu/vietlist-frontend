import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AuthenticationService,
  Endpoints,
  GenericHelper,
} from '@vietlist/shared'

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(
    private http: HttpClient,
    private sessionService: AuthenticationService,
  ) {}

  public subscriptionPlan(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SubscriptionPlan)
    return this.http.get<any>(endpoint)
  }

  public createIntent(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CreatePaymentIntent)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public confirmSubscription(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Subscription)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public freePlanSubscription(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.FreeSubscriptionAPI)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }
}
