import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints, AuthenticationService } from '@vietlist/shared'
import { Observable } from 'rxjs'
import { BusinessCategoryResponse, TagsResponse } from './business.interface'

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private http: HttpClient , private authService:AuthenticationService) {}

  public getBusinessCat(): Observable<BusinessCategoryResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessCategory)
    return this.http.get<BusinessCategoryResponse>(endpoint)
  }

  public getTags(): Observable<TagsResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Tags)
    return this.http.get<TagsResponse>(endpoint)
  }

  public addBusiness(body:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AddBusiness)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint , body , {headers:authToken})
  }
}
