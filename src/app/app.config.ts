import { GlobalSubscriptionService } from './shared/utils/services/globalsubscription.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
                              
import routes from './app.routes'
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { provideNgxStripe } from 'ngx-stripe'
import { ErrorHandlerInterceptor } from '@vietlist/shared'
import { environment } from 'src/environments/environment.development'
import { MatNativeDateModule } from '@angular/material/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


const stripePublishKey = environment.stripe_publish_key

export const appConfig: ApplicationConfig = {
  providers: [
    GlobalSubscriptionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (globalSubscriptionService: GlobalSubscriptionService) => () => {
        return globalSubscriptionService;
      },
      deps: [GlobalSubscriptionService],
      multi: true
    },
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(withNoHttpTransferCache()),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([ErrorHandlerInterceptor])),
    provideNgxStripe(stripePublishKey),
    importProvidersFrom(MatNativeDateModule, MatSlideToggleModule),
    importProvidersFrom(TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],

      }
    }))
  ],
}
