import { Injectable } from '@angular/core'
// declare var localStorage as any
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage: any = null
  constructor() {
    if (typeof localStorage === 'undefined') {
      this.storage = {
        setItem: () => {},
        getItem: () => {},
      }
    } else {
      this.storage = localStorage
    }
  }

  public saveData(key: string, value: string) {
    this.storage.setItem(key, value)
  }

  public getData(key: string) {
    return this.storage.getItem(key)
  }
  public removeData(key: string) {
    this.storage.removeItem(key)
  }

  public clearData() {
    this.storage.clear()
  }
}
