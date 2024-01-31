import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import Swal from 'sweetalert2'
export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error, 'error:::')
      Swal.fire({
        toast: true,
        text: error.error.message,
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return throwError(() => {})
    }),
  )
}
