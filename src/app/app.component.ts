import { MatDialog } from '@angular/material/dialog'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ErrorHandlerInterceptor } from '@vietlist/shared'
import { NgIf } from '@angular/common'
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import {
  FooterComponent,
  FullPageLoader,
  HeaderComponent,
  PageNotFoundComponent,
} from './common-ui'
import { FullPageLoaderService } from './shared/utils/services/loader.service'
import { AuthenticationService } from './shared'
import { OneSignal } from 'onesignal-ngx'
import { NotificationService } from './shared/utils/services/pushnotification.service'

import { getMessaging, getToken, onMessage } from 'firebase/messaging'

import { environment } from 'src/environments/environment.development'

import { Observable } from 'rxjs'
import { initializeApp } from 'firebase/app'
import Swal from 'sweetalert2'
import { ProfileService } from './manage-profile/service/profile.service'
import { ChooseLanguageComponent } from './choose-language/choose-language.component'

initializeApp(environment.firebaseConfig)
declare namespace google {
  namespace translate {
    class TranslateElement {
      static InlineLayout: any
      constructor(options: any, containerId: string)
    }
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    FullPageLoader,
    NgIf,
    PageNotFoundComponent,
    TranslateModule,
  ],
  template: `
    <app-header></app-header>
    <app-fullpage-loader *ngIf="loaderVisible == true"></app-fullpage-loader>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  message$!: Observable<any>
  message: any = null
  title = 'vietlist-frontend'
  public loaderVisible: boolean = false
  public isNotFoundPage: boolean = false
  public isAuthenticated: boolean = false

  constructor(
    private loaderService: FullPageLoaderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private oneSignal: OneSignal,
    private notificationService: NotificationService,
    private profileService: ProfileService,
    private translateService: TranslateService,
    public dialog: MatDialog,
  ) {
    // this.oneSignal.init({
    //   appId: "18528e71-bbe6-4933-b43a-0a4903923181",
    // });
    this.authenticationService.isAuthenticated$.subscribe((res: any) => {
      this.isAuthenticated = res
      if (this.isAuthenticated) {
        this.fetchProfileDetail()
      }
    })
    this.translateService.use('en')
  }

  ngOnInit() {
    this.translateService.use('en')
    this.loaderService.getLoaderVisibility().subscribe((res) => {
      this.loaderVisible = res
    })
    if (this.isAuthenticated) {
      this.fetchProfileDetail()
    }
  }

  public requestPermission() {
    const messaging = getMessaging()
    getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
        } else {
        }
      })
      .catch((err) => {})
  }

  public listen() {
    const messaging = getMessaging()
    onMessage(messaging, (payload) => {
      this.message = payload
      this.notificationService.showNotification(payload)
      Swal.fire({
        toast: true,
        position: 'top-right',
        title: payload.notification,
        timer: 10000,
      })
    })
  }

  public fetchProfileDetail() {
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.authenticationService.userDetailResponse.next(res?.data?.user)
        console.log(res, 'RESPONSE APP TS')
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges()
  }
}
