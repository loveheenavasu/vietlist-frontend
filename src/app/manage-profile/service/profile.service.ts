import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AuthenticationService,
  Endpoints,
  GenericHelper,
} from '@vietlist/shared'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private sessionService: AuthenticationService,
  ) { }

  public userDetails(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ProfileDetail)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }
  public AllEventsList(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAllEvents)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }
  public userProfileUpdate(body: any): Observable<any> {
    const authToken: any = this.sessionService.getAuthHeaders()
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.updateUserProfile)
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getBusinessByUserId(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBusinessByUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public deleteBuisness(postId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteAddedBusiness)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.delete<any>(endpoint, { headers: authToken , body:postId })
  }

  public changePasswrd(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ChangePassword)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public deleteAccount(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteAccount)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.delete<any>(endpoint, { headers: authToken })
  }

  public allowNotificationSetting(notification: any): Observable<any> {
    const formData = new FormData()
    formData.append('notification', JSON.stringify(notification))
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.NotificaionAllow)
    const authToken: any = this.sessionService.getAuthHeaders()

    return this.http.post<any>(endpoint, formData, { headers: authToken })
  }

  public getAllowedSetting(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetNotificationsetting,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public subscriptionDetails(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.UserSubscriptionDetails,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }


  public setBillingAddress(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.SetBillingAddress,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getBillingAddress(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetBillingDetails,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public setPrivacy(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.ListingPrivacySet,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getPrivacy(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetSetPrivacy,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public getAds(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetAds,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public getSpaces(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetSpaces,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public createAd(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.CreateAd
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getAdById(adsId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetAdById
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('ad_id', adsId)
    return this.http.get<any>(endpoint, { headers: authToken, params: params })
  }

  public getAdByUserId(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetAdByUserId
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public updateAd(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.UpdateAd
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public deleteAd(adsId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.DeleteAd
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('ad_id', adsId)
    return this.http.delete<any>(endpoint, { headers: authToken, params: params })
  }

  public getIPAddress() {

    return this.http.get("http://api.ipify.org/?format=json")
  }
}
