import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import Swal from 'sweetalert2'

export const errorMessageSubject = new BehaviorSubject<any>('');

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
 // Check if the request URL matches the endpoint you want to exclude
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
    
      if(error.status === 403 && req.url != 'https://vietlist.biz/wp-json/vietlist/v1/get_notification?limit=10'){
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
        errorMessageSubject.next(true)
      }else if(req.url != 'https://vietlist.biz/wp-json/vietlist/v1/get_notification?limit=10'){
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
      }
      return throwError(() => {})
    }),
  )
}