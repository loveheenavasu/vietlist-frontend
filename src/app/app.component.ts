import { Component } from '@angular/core'
import { CommonModule, NgIf } from '@angular/common'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { FooterComponent, FullPageLoader, HeaderComponent, PageNotFoundComponent } from './common-ui'
import { FullPageLoaderService } from './shared/utils/services/loader.service'
import { Observable, filter } from 'rxjs'
import { AuthenticationService } from './shared'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FullPageLoader, NgIf, PageNotFoundComponent],
  template: `
  <ng-container *ngIf="!isNotFoundPage" >
    <app-header></app-header>
    <app-fullpage-loader *ngIf="loaderVisible == true"></app-fullpage-loader>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  </ng-container>
  <ng-container *ngIf="isNotFoundPage" >
  <app-page-not-found></app-page-not-found>
  </ng-container>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vietlist-frontend'


  loaderVisible: boolean = false;
  isNotFoundPage: boolean = false;

  constructor(private loaderService: FullPageLoaderService, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.isNotFoundPage.subscribe(val => {
      this.isNotFoundPage = val
    })
  }

  ngOnInit() {
    this.loaderService.getLoaderVisibility().subscribe((res) => {
      this.loaderVisible = res
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/not-found') {
          this.isNotFoundPage = true
        }

      }
    }

    )

  }
}
