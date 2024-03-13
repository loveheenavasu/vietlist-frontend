import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.scss'
})
export class ThankYouPageComponent {

  constructor(private router:Router){}

  public goTomanageProfle(){
    this.router.navigate(['/manage-profile'])
  }
}
