import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarUrl = '/assets/links/profile.json'
  constructor(private http: HttpClient) {}

  getSidebarLinks(): Observable<any[]> {
    return this.http.get<any[]>(this.sidebarUrl)
  }
}
