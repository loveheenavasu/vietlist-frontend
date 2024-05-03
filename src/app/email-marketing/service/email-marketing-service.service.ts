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
export class EmailMarketingServiceService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

  public CreateList(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.CreateListForSubscriber,
    )
    // const authToken = this.authService.getAuthHeaders()
    const authToken = this.authService.getAuthHeaders()
    // const params = new HttpParams().set('post_id', post_id)
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }
  public GetAllList(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAllList)
    // const authToken = this.authService.getAuthHeaders()
    const authToken = this.authService.getAuthHeaders()

    const randomQueryParam = `nocache=${Math.random().toString(36).substring(7)}`
    const urlWithNoCache = `${endpoint}?${randomQueryParam}`

    return this.http.get<any>(urlWithNoCache, { headers: authToken })
  }

  public getListSubscribers(listId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetSingleListSubscribers,
    )

    const params = new HttpParams().set('list_id', listId)
    const authToken = this.authService.getAuthHeaders()
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<any>(urlWithParams, { headers: authToken })
  }
  public getAllSubscribers(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAllSubscribers)
    const authToken = this.authService.getAuthHeaders()
    const randomQueryParam = `nocache=${Math.random().toString(36).substring(7)}`
    const urlWithNoCache = `${endpoint}?${randomQueryParam}`
    return this.http.get<any>(urlWithNoCache, { headers: authToken })
  }

  formatDatee(timestamp: any) {
    if (timestamp && !isNaN(timestamp) && timestamp != 0) {
      const date = new Date(timestamp * 1000)

      // Format the date according to your desired format
      const formattedDate = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })

      return formattedDate
    } else {
      return '--'
    }
  }
  public addSubscriber(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AddSubscriber)
    const formData = new FormData()
    formData.append('first_name', body?.First_name)
    formData.append('last_name', body?.Last_name)
    formData.append('email', body?.email)
    formData.append('business_listing_id', body?.post_id)
    // formData.append('status', '1')
    if (body?.List_id) {
      formData.append('list_id', body?.List_id)
    }

    // const authToken = this.authService.getAuthHeaders()
    const authToken = this.authService.getAuthHeaders()
    // const params = new HttpParams().set('post_id', post_id)
    return this.http.post<any>(endpoint, formData, { headers: authToken })
  }
  public updateSubscriberStatus(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.ChangeSubscriptionStatus,
    )
    const formData = new FormData()
    formData.append('subscription_id', body?.id)
    formData.append('subscription_status', body?.status?.toLowerCase())

    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, formData, { headers: authToken })
  }
  public GetAllTemplate(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAllTemplate)

    const authToken = this.authService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public CreateNewCampaign(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CreateNewCampaign)
    const formData = new FormData()
    formData.append('post_title', body?.post_title)
    formData.append('post_content', body?.post_content)
    formData.append('_mailster_subject', body?._mailster_subject)
    formData.append('_mailster_from_name', body?._mailster_from_name)
    formData.append('_mailster_from_email', body?._mailster_from_email)
    formData.append('_mailster_reply_to', body?._mailster_reply_to)
    formData.append('_mailster_lists', body?._mailster_lists)

    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, formData, { headers: authToken })
  }

  public GetCampaignById(campaignId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetCampaign)
    const params = new HttpParams().set('campaign_id', campaignId)
    const authToken = this.authService.getAuthHeaders()
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<any>(urlWithParams, { headers: authToken })
  }
  public GetAllCampaign(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAllCampaign)
    const authToken = this.authService.getAuthHeaders()
    const randomQueryParam = `nocache=${Math.random().toString(36).substring(7)}`
    const urlWithNoCache = `${endpoint}?${randomQueryParam}`
    return this.http.get<any>(urlWithNoCache, { headers: authToken })
  }
  public UpdateCampaignStatus(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.StartCampaign)
    const formData = new FormData()
    formData.append('campaign_id', body?.id)
    formData.append('campaign_status', body?.status)

    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, formData, { headers: authToken })
  }
}
