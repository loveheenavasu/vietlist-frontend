import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FooterComponent, HeaderComponent } from './common-ui'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule ,HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vietlist-frontend'
}
