import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints, AuthenticationService } from '@vietlist/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { BusinessCategoryResponse, TagsResponse } from './business.interface'
interface Files {
  uri: string;
  type: string;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  public storePostId = new BehaviorSubject<any>('')
  public isSubscriptionFormFilled = new BehaviorSubject<boolean>(false)
  public isBusinessBioFormFilled = new BehaviorSubject<boolean>(false)
  public isBusinessFormFilled = new BehaviorSubject<boolean>(false)
  public isConsultationFormFilled = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  public getBusinessCat(): Observable<BusinessCategoryResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessCategory)
    return this.http.get<BusinessCategoryResponse>(endpoint)
  }

  public getTags(): Observable<TagsResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Tags)
    return this.http.get<TagsResponse>(endpoint)
  }

  public getDefaultCat(categories: number[]): Observable<TagsResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DefaultCatApi);
    const params = new HttpParams().set('category_ids', categories.join(','));
    const urlWithParams = `${endpoint}?${params.toString()}`;
    return this.http.get<TagsResponse>(urlWithParams);
  }

  public addBusiness(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AddBusiness)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public updateBusiness(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UpdateBusiness)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public getBusiness(post_id: string): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinesssGet);
    const authToken = this.authService.getAuthHeaders();
    const params = new HttpParams().set('post_id', post_id)
    return this.http.get<any>(endpoint, { headers: authToken, params: params });
  }

  public uploadMedia(image: any) {
    const formData = new FormData();
    formData.append('image', image);
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UploadMedia);
    return this.http.post<any>(endpoint, formData);
  }

  public findBusiness(price: number, post_category: number, posts_per_page: number, page_no: number): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.FindBusiness);
    const authToken = this.authService.getAuthHeaders();
    const params = new HttpParams().set('price', price).set('post_category', post_category).set('posts_per_page', posts_per_page).set('page_no', page_no);
    return this.http.get<any>(endpoint, { headers: authToken, params: params });
  }

  public ListingBusiness(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ListingBusiness);
    const authToken = this.authService.getAuthHeaders();
    return this.http.get<any>(endpoint, { headers: authToken });
  }

}