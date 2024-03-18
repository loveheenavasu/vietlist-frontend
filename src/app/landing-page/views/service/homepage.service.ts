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

  public showAD(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ShowAd)
    return this.http.get<any>(endpoint)
  }

  public setStats(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetStats)
    return this.http.post<any>(endpoint, body)
  }

  public blogCategoery(category_type: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BlogCategory)
    const params = new HttpParams().set('category_type', category_type)
    return this.http.get<any>(endpoint, { params: params })
  }

  public getAllBusinessBlog(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessBlog)
    return this.http.get<any>(endpoint)
  }
  public userBlogs(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UserBlogs)
    return this.http.get<any>(endpoint)
  }

  public userBlogsDetail(blog_id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UserBlogsDetail)
    const params = new HttpParams().set('blog_id', blog_id)
    return this.http.get<any>(endpoint, { params: params })
  }

  public contactus(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Contactus)
    return this.http.post<any>(endpoint, body)
  }
}
