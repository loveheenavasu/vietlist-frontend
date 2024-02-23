import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints } from '@vietlist/shared'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  public getEventTags(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventTags)
    return this.http.get(endpoint)
  }

  public getEventCat(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventCatgeory)
    return this.http.get(endpoint)
  }

  public getPublishEvents():Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetPublishEvent)
    return this.http.get(endpoint)
  }

  public getEventDetailsByPostId(post_id:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventDetailsByPostId)
    const params = new HttpParams().set('post_id' , post_id)
    return this.http.get<any>(endpoint, {params: params })
  }
}
