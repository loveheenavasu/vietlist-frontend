import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import routes from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { provideNgxStripe } from 'ngx-stripe'
import { ErrorHandlerInterceptor } from '@vietlist/shared'
import { environment } from 'src/environments/environment.development'
import { AgmCoreModule } from '@agm/core'
const stripePublishKey = environment.stripe_publish_key
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([ErrorHandlerInterceptor])),
    provideNgxStripe(stripePublishKey),
    importProvidersFrom(AgmCoreModule.forRoot({ apiKey: 'AIzaSyAUnuPXweOavCoI5FlyO5z4UXf_6y74Zfg' }))
  ],
}
