import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints } from '@vietlist/shared'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEventTags(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventTags)
    return this.http.get(endpoint)
  }

  getEventCat(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.EventCatgeory)
    return this.http.get(endpoint)
  }
}
