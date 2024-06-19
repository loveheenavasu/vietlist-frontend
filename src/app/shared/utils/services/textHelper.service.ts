import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TextHelperService {
  constructor() {}

  public truncated(text: string, length: number): any {
    if (!text) return
    if (text.length > length) {
      return `${text.slice(0, length)}...`
    } else return text
  }
}
