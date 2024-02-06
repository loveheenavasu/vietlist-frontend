import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints, AuthenticationService } from '@vietlist/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { BusinessCategoryResponse, TagsResponse } from './business.interface'

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  public storePostId = new BehaviorSubject<any>('')
  constructor(private http: HttpClient , private authService:AuthenticationService) {}

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
  
    // Construct the query parameters using HttpParams
    const params = new HttpParams().set('category_ids', categories.join(','));
  
    // Append the constructed parameters to the URL
    const urlWithParams = `${endpoint}?${params.toString()}`;
  
    return this.http.get<TagsResponse>(urlWithParams);
  }



  public addBusiness(body:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AddBusiness)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint , body , {headers:authToken})
  }

  public updateBusiness(body:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UpdateBusiness)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint , body , {headers:authToken})
  }
  public getBusiness(post_id: string): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinesssGet);
    const authToken = this.authService.getAuthHeaders();
    const params = new HttpParams().set('post_id', post_id);
    return this.http.get<any>(endpoint, { headers: authToken, params: params });
  } 
}