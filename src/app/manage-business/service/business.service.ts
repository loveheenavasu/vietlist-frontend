import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  GenericHelper,
  Endpoints,
  AuthenticationService,
} from '@vietlist/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { BusinessCategoryResponse, TagsResponse } from './business.interface'
type DayName = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'
type DayNamee = {
  [key: string]: string // Use an index signature to allow any string key
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
  public dayName: DayNamee = {
    Mo: 'Monday',
    Tu: 'Tuesday',
    We: 'Wednesday',
    Th: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  }

  format24To12 = {
    13: '01',
    14: '02',
    15: '03',
    16: '04',
    17: '05',
    18: '06',
    19: '07',
    20: '08',
    21: '09',
    22: '10',
    23: '11',
    24: '12',
  }

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

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
    // const authToken = this.authService.getAuthHeaders()
    const params = new HttpParams().set('post_id', post_id)
    return this.http.get<any>(endpoint, { params: params })
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

  public webinarRegistration(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.WebinarRegistration)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  public videoIntegration(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(
      Endpoints.BusinessVideoIntegration,
    )
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }

  // public getVideoIntegration(post_id:any , post_type:any):Observable<any>{
  //   const endpoint = GenericHelper.appendBaseUrl(Endpoints.VideosType)
  //   const authToken = this.authService.getAuthHeaders()
  //   const params = new HttpParams().set('post_id', post_id).set('post_type' , post_type)
  //   return this.http.get<any>(endpoint, { headers:authToken , params: params })
  // }

  public addSubscriber(info: any) {
    const formData = new FormData()
    formData.append('email', info?.email)
    formData.append('First_name', info?.first_name)
    formData.append('Last_name', info?.last_name)
    formData.append('List_id', info?.list_id)
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.AddSubscriber)
    return this.http.post<any>(endpoint, formData)
  }
  public getVideoIntegration(post_id: any, post_type: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.VideosType)
    const authToken = this.authService.getAuthHeaders()
    const params = new HttpParams()
      .set('post_id', post_id)
      .set('video_type', post_type)
    return this.http.get<any>(endpoint, { headers: authToken, params: params })
  }

  public getAllVideoIntegration(post_id: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetAllVideo)
    // const authToken = this.authService.getAuthHeaders()
    // const randomQueryParam = `nocache=${Math.random().toString(36).substring(7)}`
    const params = new HttpParams()
      .set('post_id', post_id)
      .set('nocache=', Math.random().toString(36).substring(7))
    return this.http.get<any>(endpoint, { params: params })
  }

  public deleteVideo(videoId: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.DeleteVideoType)
    const authToken = this.authService.getAuthHeaders()
    const params = new HttpParams().set('video_id', videoId)
    return this.http.delete<any>(endpoint, {
      headers: authToken,
      params: params,
    })
  }

  public updateVideo(body: any): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.UpdateVideo)
    const authToken = this.authService.getAuthHeaders()
    return this.http.post<any>(endpoint, body, { headers: authToken })
  }
  convertTimeTo12HourFormat(timeString: string) {
    const [startTime, endTime] = timeString.split('-')
    return `${this.convertTo12Hour(startTime)} - ${this.convertTo12Hour(endTime)}`
  }

  convertTo12Hour(time: string) {
    if (time.slice(0, 2) !== '00') {
      const hour = time.slice(0, 2)
      const minute = time.slice(3, 5)
      const period = parseInt(hour) >= 12 ? 'PM' : 'AM'
      const hour12 =
        (this.format24To12 as { [key: number]: string })[parseInt(hour)] || hour
      return `${hour12}:${minute}${period}`
    } else {
      return time
    }
  }

  combineMultipleTime(time: string[]) {
    let result: any[] = []
    let dayName: Record<DayName, boolean> = {
      Mo: true,
      Tu: true,
      We: true,
      Th: true,
      Fr: true,
      Sa: true,
      Su: true,
    }
    for (let index = 0; index < time.length; index++) {
      const day = time[index].slice(0, 2) as DayName
      if (dayName[day]) {
        result.push(time[index])
      } else if (time[index].slice(0, 3) !== 'UTC') {
        result.push(`${result.pop()},${time[index]}`)
      } else {
        result.push(time[index])
      }
    }
    return result
  }
  check24hour(time: string) {
    let splitedTime = time.split('-')
    if (time.trim() === '00:00-00:00') {
      return true
    } else if (splitedTime[0] === splitedTime[1]) {
      return true
    }
    return false
  }

  hourFormat(time: string) {
    let slicedTime = time.slice(3, time.length)
    let day = time.slice(0, 2)
    let splitTime = slicedTime.split(',')

    if (this.dayName[day]) {
      let time = ''
      for (let index = 0; index < splitTime.length; index++) {
        if (this.check24hour(splitTime[index])) {
          time += '<div >24 Hours</div>'
        } else {
          time += `<div > ${this.convertTimeTo12HourFormat(splitTime[index])} </div>`
        }
      }
      return `<div class="col-4">${this.dayName[day]}</div> <div class='col-7 d-flex gap-1 flex-column '> ${time} </div> `
    } else {
      return `<div class='col-12' > ${time} </div>`
    }
  }

  public getMlsData(page_no:any , posts_per_page:any):Observable<any>{
    const params = new HttpParams()
    .set('page_no', page_no)
    .set('posts_per_page',posts_per_page)
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.GetMLSData)
    return this.http.get<any>(endpoint , {params:params})
  }

}
