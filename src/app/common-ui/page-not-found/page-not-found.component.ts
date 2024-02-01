import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@vietlist/shared';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private router: Router, private authenicationService: AuthenticationService) { }

  public back() {
    this.router.navigateByUrl('/')
  }
}
