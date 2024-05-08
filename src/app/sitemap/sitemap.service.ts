import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SitemapService {
  private sitemapUrl = '/assets/links/sitemap.json'
  constructor(private http: HttpClient) {}

  getSiteMapsLinks(): Observable<any[]> {
    return this.http.get<any[]>(this.sitemapUrl)
  }
}
