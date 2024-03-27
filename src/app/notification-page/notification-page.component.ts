import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss'
})
export class NotificationPageComponent {

}
