import { HttpClient } from '@angular/common/http'
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
}
