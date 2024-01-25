import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints, GenericHelper } from '@vietlist/shared';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/app/shared/utils/services/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
bearerToken?:any;
  constructor(private http: HttpClient) { 
    this.bearerToken = localStorage.getItem('vietlist::session')
  
  }

  public profileData(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ProfileDetail)
    const headers = new HttpHeaders().set('Authorization', this.bearerToken);
    return this.http.get<any>(endpoint, {headers})
  }
}
