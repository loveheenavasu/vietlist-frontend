import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
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


  
  public cancelPlan(level_id: string): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CancelMembership);
    const authToken: any = this.sessionService.getAuthHeaders()
    const formData = new FormData();
    formData.append('level_id', level_id);
    return this.http.post<any>(endpoint, formData, { headers: authToken });
  }

  public applyCoupon(pmpro_coupon:any , level_id:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.PmproCoupon);
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('pmpro_coupon' , pmpro_coupon).set('level_id' , level_id)
    return this.http.get<any>(endpoint,  { params:params , headers: authToken });
  }
}
