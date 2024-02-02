import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GenericHelper, Endpoints } from '@vietlist/shared'
import { Observable } from 'rxjs'
import { BusinessCategoryResponse } from './business.interface'

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  public getBusinessCat(): Observable<BusinessCategoryResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessCategory)
    return this.http.get<BusinessCategoryResponse>(endpoint)
  }
}
