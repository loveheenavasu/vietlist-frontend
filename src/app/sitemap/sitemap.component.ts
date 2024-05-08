import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SitemapService } from './sitemap.service'

@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.scss',
})
export class SitemapComponent {
  constructor(
    public router: Router,
    private siteMapservice: SitemapService,
  ) {}
  links: any[] = []

  ngOnInit() {
    this.siteMapservice.getSiteMapsLinks().subscribe((res) => {
      this.links = res
    })
  }
}
