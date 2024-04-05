import { NgIf } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import {
  FooterComponent,
  FullPageLoader,
  HeaderComponent,
  PageNotFoundComponent,
} from './common-ui'
import { FullPageLoaderService } from './shared/utils/services/loader.service'
import { AuthenticationService } from './shared'
import { OneSignal } from 'onesignal-ngx';
import { PushNotificationService } from './shared/utils/services/pushnotification.service'

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment.development'

import { Observable } from 'rxjs'
import { initializeApp } from "firebase/app";
initializeApp(environment.firebaseConfig);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    FullPageLoader,
    NgIf,
    PageNotFoundComponent
  ],
  template: `
    <app-header></app-header>
      <app-fullpage-loader *ngIf="loaderVisible == true"></app-fullpage-loader>
    <router-outlet>

    </router-outlet>
    <app-footer></app-footer>

  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  message$!: Observable<any>;
  message:any = null;
  title = 'vietlist-frontend'
  public loaderVisible: boolean = false
  public isNotFoundPage: boolean = false

  constructor(
    private loaderService: FullPageLoaderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private oneSignal: OneSignal,
    private pushService: PushNotificationService,
  ) {
    // this.oneSignal.init({
    //   appId: "18528e71-bbe6-4933-b43a-0a4903923181",
    // });
   
   }
   ngOnInit() {
    this.loaderService.getLoaderVisibility().subscribe((res) => {
      this.loaderVisible = res
    })
    this.requestPermission();
    this.listen();
  }


   requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebaseConfig.vapidKey}).then(
       (currentToken:any) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

  ngAfterContentChecked(): void {

    this.changeDetector.detectChanges();
  }
}
