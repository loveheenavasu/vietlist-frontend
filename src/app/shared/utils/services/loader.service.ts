import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullPageLoaderService {

  private loaderVisible = new BehaviorSubject<boolean>(false);

  showLoader() {
    this.loaderVisible.next(true);
  }

  hideLoader() {
    this.loaderVisible.next(false);
  }

  getLoaderVisibility(): Observable<boolean> {
    return this.loaderVisible.asObservable();
  }
}
