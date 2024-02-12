import { Injectable } from '@angular/core'
import { Endpoints, GenericHelper } from '@vietlist/shared'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}

  public homePageContent(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.HomePage)
    return this.http.get<any>(endpoint)
  }

  public footerContent(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.FooterContent)
    return this.http.get<any>(endpoint)
  }

  public EmailSubscribeNewsletter(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SubscribeNewsletter)
    return this.http.post<any>(endpoint, body)
  }
}
