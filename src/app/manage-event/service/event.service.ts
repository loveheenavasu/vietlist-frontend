import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  GenericHelper,
  Endpoints,
  AuthenticationService,
} from '@vietlist/shared'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private http: HttpClient,
    private sessionService: AuthenticationService,
  ) {}

  public getEventTags(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventTags)
    return this.http.get(endpoint)
  }

  public addEvent(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AddEvent)
    const authToken = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public updateEvent(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UpdateEvent)
    const authToken = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getEventCat(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventCatgeory)
    return this.http.get(endpoint)
  }

  public getPublishEvents(params: { [key: string]: any }): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetPublishEvent)
    let queryParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key])
      }
    })
    return this.http.get(endpoint, { params: queryParams })
  }

  public getEventDetailsByPostId(post_id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventDetailsByPostId)
    const params = new HttpParams().set('post_id', post_id)
    return this.http.get<any>(endpoint, { params: params })
  }

  public findEvents(params: { [key: string]: any }): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.FindEvent)
    let queryParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key])
      }
    })
    return this.http.get<any>(endpoint, { params: queryParams })
  }

  public getEventsByUserId() {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetEventUsingUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get(endpoint, { headers: authToken })
  }

  public deleteEvent(id: any) {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteEvent)
    const authToken: any = this.sessionService.getAuthHeaders()
    let params = new HttpParams().set('post_id', id)
    return this.http.delete(endpoint, { headers: authToken, params: params })
  }

  public setReviewReply(body: any) {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetReviewReply)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post(endpoint, body, { headers: authToken })
  }

  public getReviewReply(
    comment_parent: any,
    post_id: any,
  ): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetReviewReply)
    let queryParams = new HttpParams()
      .set('comment_parent', comment_parent)
      .set('post_id', post_id)

    return this.http.get<any>(endpoint, { params: queryParams })
  }


  public getAllBookings(event_id:any){
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AllBookingsByEventId)
    const authToken: any = this.sessionService.getAuthHeaders()
    let queryParams = new HttpParams()
    .set('event_id', event_id)
    return this.http.get(endpoint, {headers:authToken , params:queryParams})
  }

  public createPaymentIntentForBooking(){
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CreateBookingPaymentIntent)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post(endpoint, null , { headers: authToken })
  }

  public stripebookingPayment(body:any){
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.StripePaymentForBooking)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post(endpoint, body , { headers: authToken })
  }

  public addEventBooking(body:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetEventBooking)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post(endpoint, body , { headers: authToken })
  }
  
  public getMyBooking():Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.MyBookingsByUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get(endpoint, {headers:authToken })
  }

  public cancelEventBooking(body:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CancelEventBooking)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post(endpoint, body , {headers:authToken })
  }

  public getBookingDetails(booking_id:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BookingDetails)
    const authToken: any = this.sessionService.getAuthHeaders()
    let queryParams = new HttpParams()
    .set('booking_id', booking_id)
    return this.http.get(endpoint, {headers:authToken  , params:queryParams})
  }
}
