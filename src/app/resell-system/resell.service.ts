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
export class LeadgenerationService {
  private loanApplication = '/assets/links/loan-application.json'

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

  getLoanApplicationTitlesAndUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.loanApplication)
  }

  public CreateLead(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CreateLead)
    const authToken = this.authService.getAuthHeaders()

    let formData = new FormData()
    for (let key in body) {
      formData.set(key, body[key])
    }

    return this.http.post<any>(endpoint, formData)
  }
  public GetLeads(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetLeads)
    const authToken = this.authService.getAuthHeaders()

    return this.http.get<any>(endpoint, { headers: authToken })
  }
}