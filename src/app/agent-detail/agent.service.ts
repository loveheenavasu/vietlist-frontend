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
export class AgentService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

  public GetRealStateAgentDetails(userId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.GetRealEstateAgentDetails,
    )
    const params = new HttpParams().set('user_id', userId)

    return this.http.get<any>(endpoint, { params })
  }
}
