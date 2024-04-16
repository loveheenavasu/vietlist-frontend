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
    // const params = new HttpParams().set('post_id', post_id)
    return this.http.get<any>(endpoint, { headers: authToken })
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
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  formatDate(unixTimestamp: any) {
    if (unixTimestamp && !isNaN(unixTimestamp)) {
      const date = new Date(parseInt(unixTimestamp))
      const month = date.toLocaleString('default', { month: 'long' })
      const day = date.getDate()
      const year = date.getFullYear()
      const hours = date.getHours()
      const minutes = date.getMinutes()

      const amPm = hours >= 12 ? 'pm' : 'am'
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

      const formattedDate = `${month} ${day}, ${year} ${formattedHours}:${formattedMinutes} ${amPm}`
      return formattedDate
    } else {
      return '--'
    }
  }
}
