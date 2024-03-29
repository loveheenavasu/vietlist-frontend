import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  GenericHelper,
  Endpoints,
  AuthenticationService,
} from '@vietlist/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { BusinessCategoryResponse, TagsResponse } from './business.interface'

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  public storePostId = new BehaviorSubject<any>('')
  public isSubscriptionFormFilled = new BehaviorSubject<boolean>(false)
  public isBusinessBioFormFilled = new BehaviorSubject<boolean>(false)
  public isBusinessFormFilled = new BehaviorSubject<boolean>(false)
  public isConsultationFormFilled = new BehaviorSubject<boolean>(false)
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) { }

  public getBusinessCat(): Observable<BusinessCategoryResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinessCategory)
    return this.http.get<BusinessCategoryResponse>(endpoint)
  }

  public getTags(): Observable<TagsResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.Tags)
    return this.http.get<TagsResponse>(endpoint)
  }

  public getDefaultCat(categories: number[]): Observable<TagsResponse> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DefaultCatApi)
    const params = new HttpParams().set('category_ids', categories.join(','))
    const urlWithParams = `${endpoint}?${params.toString()}`
    return this.http.get<TagsResponse>(urlWithParams)
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
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BusinesssGet)
    const authToken = this.authService.getAuthHeaders()
    const params = new HttpParams().set('post_id', post_id)
    return this.http.get<any>(endpoint, { headers: authToken, params: params })
  }

  public uploadMedia(image: any) {
    const formData = new FormData()
    formData.append('image', image)
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UploadMedia)
    return this.http.post<any>(endpoint, formData)
  }

  public findBusiness(params: { [key: string]: any }): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.FindBusiness)
    let queryParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key])
      }
    })
    return this.http.get<any>(endpoint, { params: queryParams })
  }

  public ListingBusiness(params: { [key: string]: any }): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ListingBusiness)
    let queryParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        queryParams = queryParams.set(key, params[key])
      }
    })

    return this.http.get<any>(endpoint, { params: queryParams })
  }
  public GetReviewList(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.getReview)
    const params = new HttpParams().set('post_id', body)
    return this.http.get<any>(endpoint, { params: params })
  }

  public trendingBusiness(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.TrendingBusiness)
    return this.http.get<any>(endpoint)
  }

  public benefitJoining(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.BenefitsJoining)
    return this.http.get<any>(endpoint)
  }
}
