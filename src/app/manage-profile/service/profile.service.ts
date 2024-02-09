import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AuthenticationService,
  Endpoints,
  GenericHelper,
} from '@vietlist/shared'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private sessionService: AuthenticationService,
  ) {}

  public userDetails(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ProfileDetail)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, { headers: authToken })
  }

  public userProfileUpdate(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.updateUserProfile)
    return this.http.post<any>(endpoint, body)
  }

  public getBusinessByUserId():Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBusinessByUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.get<any>(endpoint, {headers:authToken})
  }

  public deleteBuisness(postId:any):Observable<any>{
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetBusinessByUserId)
    const authToken: any = this.sessionService.getAuthHeaders()
    return this.http.post<any>(endpoint, postId , {headers:authToken})
  }
}
