import { Injectable } from '@angular/core'
import { AuthenticationService, Endpoints, GenericHelper } from '@vietlist/shared'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient , private sessionService:AuthenticationService) { }

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

  public getAllBusinessBlog(posts_per_page: any, page_no: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessBlog)
    let params = new HttpParams().set('posts_per_page', posts_per_page).set('page_no', page_no)

    return this.http.get<any>(endpoint, { params: params })
  }


  public userBlogs(posts_per_page: any, page_no: any, blog_page?: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UserBlogs)
    let params = new HttpParams().set('posts_per_page', posts_per_page).set('page_no', page_no)
    if (blog_page !== undefined) {
      params = params.set('blog_page', blog_page);
    }
    return this.http.get<any>(endpoint, { params: params })
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

  public setBlogComment(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetBlogComment)
    return this.http.post<any>(endpoint, body)
  }
  public setReplyBlog(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.SetReplyBlog)
    return this.http.post<any>(endpoint, body)
  }

  public getBlogComment(post_id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBlogComment)
    const params = new HttpParams().set('post_id', post_id)
    return this.http.get<any>(endpoint, { params: params })
  }

  public getNotification():Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessNotification)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, {headers:authToken})
  }

}
