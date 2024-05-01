import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  GenericHelper,
  Endpoints,
  AuthenticationService,
} from '@vietlist/shared'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

  public GetBusinessListingAnalytics(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetBusnessListingAnalytics,
    )
    const params = new HttpParams()
      .set('time_period', body?.time_period)
      .set('page_no', body?.page_no)
      .set('posts_per_page', body?.posts_per_page)
    const authToken = this.authService.getAuthHeaders()
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<any>(urlWithParams, { headers: authToken })
  }
  public GetEventAnalytics(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetEventAnalytics)
    const params = new HttpParams()
      .set('time_period', body?.time_period)
      .set('page_no', body?.page_no)
      .set('posts_per_page', body?.posts_per_page)
    const authToken = this.authService.getAuthHeaders()
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<any>(urlWithParams, { headers: authToken })
  }
  public GetBookingAnalytics(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBookingAnalytics)
    const params = new HttpParams().set('time_period', body?.time_period)
    // .set('page_no', body?.page_no)
    // .set('posts_per_page', body?.posts_per_page)
    const authToken = this.authService.getAuthHeaders()
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<any>(urlWithParams, { headers: authToken })
  }
  public GetAdsAnalytics(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAdsAnalytics)
    const params = new HttpParams().set('time_period', body?.time_period)
    // .set('page_no', body?.page_no)
    // .set('posts_per_page', body?.posts_per_page)
    const authToken = this.authService.getAuthHeaders()
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<any>(urlWithParams, { headers: authToken })
  }
}
