import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints, GenericHelper, LocalStorageService } from '@vietlist/shared';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/app/shared/utils/services/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
bearerToken?:any;
  constructor(private http: HttpClient  ,private localStorage:LocalStorageService ) { 
    if (typeof document !== 'undefined') {
    this.bearerToken = localStorage.getData('vietlist::session')
    }
  
  }

  public profileData(): Observable<any> {
    const endpoint = GenericHelper.appendBaseUrl(Endpoints.ProfileDetail)
    const headers = new HttpHeaders().set('Authorization', this.bearerToken);
    return this.http.get<any>(endpoint, {headers})
  }
}
