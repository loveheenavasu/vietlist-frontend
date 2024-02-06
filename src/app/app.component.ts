import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import {
  FooterComponent,
  FullPageLoader,
  HeaderComponent
} from './common-ui'
import { FullPageLoaderService } from './shared/utils/services/loader.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    FullPageLoader,
    NgIf
  ],
  template: `
    <app-header></app-header>
    @if (loaderVisible === true) {
      <app-fullpage-loader></app-fullpage-loader>
    }
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vietlist-frontend'
  public loaderVisible: boolean = false
  public isNotFoundPage: boolean = false

  constructor(
    private loaderService: FullPageLoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loaderService.getLoaderVisibility().subscribe((res:any) => {
      this.loaderVisible = res
    })
  }
}