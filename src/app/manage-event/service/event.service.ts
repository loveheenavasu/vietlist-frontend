import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints, AuthenticationService } from '@vietlist/shared'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient,private sessionService:AuthenticationService) {}

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

  public getPublishEvents(params: { [key: string]: any }):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetPublishEvent)
    let queryParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key])
      }
    })
    return this.http.get(endpoint , { params: queryParams })
  }

  public getEventDetailsByPostId(post_id:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventDetailsByPostId)
    const params = new HttpParams().set('post_id' , post_id)
    return this.http.get<any>(endpoint, {params: params })
  }

  public findEvents(params: { [key: string]: any }): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.FindBusiness)
    let queryParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key])
      }
    })
    return this.http.get<any>(endpoint, { params: queryParams })
  }

  public getEventsByUserId(){
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetEventUsingUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get(endpoint , {headers:authToken})
  }

  public deleteEvent(id:any){
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteEvent)
    const authToken: any = this.sessionService.getAuthHeaders()
    let params = new HttpParams().set('post_id', id);
    return this.http.delete(endpoint , {headers:authToken , params:params})
  }

}
