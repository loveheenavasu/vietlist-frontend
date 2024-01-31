import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FullPageLoaderService {
  private loaderVisible = new BehaviorSubject<boolean>(false)

  public showLoader() {
    this.loaderVisible.next(true)
  }

  public hideLoader() {
    this.loaderVisible.next(false)
  }

  public getLoaderVisibility(): Observable<boolean> {
    return this.loaderVisible.asObservable()
  }
}
