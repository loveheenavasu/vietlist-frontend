import { Injectable } from '@angular/core'
// declare var localStorage as any
@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  public saveData(key: string, value: string) {
    if(!key) return;
    
    localStorage.setItem(key, value)
  }

  public getData(key: string) {
    if(!key) return;

    return localStorage.getItem(key) ?? undefined;
  }
  
  public removeData(key: string) {
    if(!key) return;
    
    if(localStorage.getItem(key)) localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear()
  }
}
