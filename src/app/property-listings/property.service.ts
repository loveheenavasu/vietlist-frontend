import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  AuthenticationService,
  Endpoints,
  GenericHelper,
} from '../shared/utils'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(
    private sessionService: AuthenticationService,
    private http: HttpClient,
  ) {}

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })

  formatToUSD(num: any) {
    return this.formatter.format(num)
  }
  public GetPropertyDetails(id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetPropertyDetails)
    const authToken: any = this.sessionService.getAuthHeaders()
    const params = new HttpParams().set('zpid', id)
    return this.http.get<any>(endpoint, { params: params })
  }
}
