// language.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();
  translations: any = {};

  constructor(private http: HttpClient) {}

  setLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
    this.loadTranslations(language);
  }

  loadTranslations(language: string): void {
    this.http.get(`assets/links/${language}.json`).subscribe((translations: any) => {
      this.translations = translations;
    });
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
