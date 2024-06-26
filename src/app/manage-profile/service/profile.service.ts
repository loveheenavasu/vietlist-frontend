import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AuthenticationService,
  Endpoints,
  GenericHelper,
} from '@vietlist/shared'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public isProfileComplete = new BehaviorSubject<any>(false)
  constructor(
    private http: HttpClient,
    private sessionService: AuthenticationService,
  ) {}

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
  public reviewSet(body: any): Observable<any> {
    // const authToken: any = this.sessionService.getAuthHeaders()
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.setReview)
    return this.http.post<any>(endpoint, body)
  }
  public userProfileUpdate(body: any): Observable<any> {
    const authToken: any = this.sessionService.getAuthHeaders()
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.updateUserProfile)
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getBusinessByUserId(posts_per_page: any, page: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBusinessByUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams()
      .set('posts_per_page', posts_per_page)
      .set('page', page)
    return this.http.get<any>(endpoint, { headers: authToken, params: params })
  }

  public deleteBuisness(postId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteAddedBusiness)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.delete<any>(endpoint, { headers: authToken, body: postId })
  }

  public changePasswrd(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ChangePassword)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public deleteAccount(delete_reason: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteAccount)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('delete_reason', delete_reason)
    const options = {
      headers: authToken,
      params: params,
    }

    return this.http.delete<any>(endpoint, options)
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
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetBillingAddress)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getBillingAddress(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBillingDetails)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public setPrivacy(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ListingPrivacySet)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getPrivacy(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetSetPrivacy)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public getAds(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAds)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public getSpaces(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetSpaces)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public createAd(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CreateAd)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getAdById(adsId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAdById)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('ad_id', adsId)
    return this.http.get<any>(endpoint, { headers: authToken, params: params })
  }

  public getAdByUserId(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAdByUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public updateAd(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UpdateAd)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public deleteAd(adsId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteAd)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('ad_id', adsId)
    return this.http.delete<any>(endpoint, {
      headers: authToken,
      params: params,
    })
  }
  public cancelpolicy(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Cancelpolicy)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }
  // public getcancelpolicy(): Observable<any> {
  //   const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetCancelpolicy)
  //   const authToken: any = this.sessionService.getAuthHeaders()
  //   return this.http.post<any>(endpoint, { headers: authToken })
  // }

  public getcancelpolicy(user_id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetCancelpolicy)
    let queryParams = new HttpParams().set('user_id', user_id)
    return this.http.get<any>(endpoint, { params: queryParams })
  }

  public setMlsKey(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetMlsKey)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public syncList(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SyncList)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getMLS(posts_per_page: any, page: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetMLSList)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams()
      .set('posts_per_page', posts_per_page)
      .set('page_no', page)
    return this.http.get<any>(endpoint, { headers: authToken, params: params })
  }

  public getMLSDataById(id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetMLSDataById)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('id', id)
    return this.http.get<any>(endpoint, { params: params })
  }

  public completeRealEstateProfile(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.CompleteReatEstateProfile,
    )
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getRealEstateProfileDetails(user_id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetRealEstateDetails)
    // const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('user_id', user_id)
    return this.http.get<any>(endpoint, { params: params })
  }

  public getIPAddress() {
    // return this.http.get("https://api.ipify.org/?format=json")
    return this.http.get('https://jsonip.com/')
  }
}
