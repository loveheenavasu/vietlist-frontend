import { Injectable } from '@angular/core'
import { AuthenticationService, Endpoints, GenericHelper } from '@vietlist/shared'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  constructor(private http: HttpClient, private sessionService: AuthenticationService) { }

  public claimBusiness(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ClaimBusiness)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }
}
