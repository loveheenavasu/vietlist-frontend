import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent, FullPageLoader, HeaderComponent } from './common-ui'
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
    @if(loaderVisible === true){
      <app-fullpage-loader></app-fullpage-loader>
    }
  
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'vietlist-frontend'
  public loaderVisible: boolean = false

  constructor(private loaderService: FullPageLoaderService) {}

  ngOnInit() {
    this.loaderService.getLoaderVisibility().subscribe((res) => {
      this.loaderVisible = res
    })
  }
}
