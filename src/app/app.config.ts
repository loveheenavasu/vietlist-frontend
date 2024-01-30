
import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import routes from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideNgxStripe } from 'ngx-stripe'
import { ErrorHandlerInterceptor } from '@vietlist/shared'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch() , withInterceptors([ErrorHandlerInterceptor])), 
    provideNgxStripe('pk_test_51OcjKcSDTxn5PnSnUkGsFY6f3eDEpOoHEoxCrUO5srUQucFKEDoHmEP0tOzbH1kDHaVjkIuB8suYLHXmv8kiqWGR00Tw3CJyHB')
  ],
}