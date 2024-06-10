import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor() {}

  loadGoogleTranslate() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(script)
  }
}
