import { HttpClient, HttpParams } from '@angular/common/http'
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
export class CouponService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

  public createCoupon(body:any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.CreateCoupon)
    const authToken:any = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint , body , {headers:authToken})
  }

  public getCoupon(per_page:any , page_no:any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetCoupons)
    const authToken:any = this.authService.getAuthHeaders()
    const params = new HttpParams().set('per_page' , per_page).set('page_no' , page_no)
    return this.http.get<any>(endpoint , {headers:authToken , params:params})
  }

  public deleteCoupon(id:any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteCoupon)
    const authToken = this.authService.getAuthHeaders()
    const params = new HttpParams().set('id' , id)
    return this.http.delete<any>(endpoint , {headers:authToken , params:params})
  }

  public updateCoupon(body:any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UpdateCoupon)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint , body , {headers:authToken})
  }

}
