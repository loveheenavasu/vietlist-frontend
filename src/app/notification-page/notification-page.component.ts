import { FormControl } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomepageService } from '../landing-page/views/service/homepage.service';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [MatSlideToggleModule,MatTooltipModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss'
})
export class NotificationPageComponent {
  public notificationArr :any[]= []
  constructor(private notification:HomepageService){}

  ngOnInit(){
    this.getNotifications()
  }

  getNotifications(notificationType?: string) {
    this.notification.getNotification({ notification_type: notificationType }).subscribe({
      next: (res:any) => {
        this.notificationArr = res?.data
      }
    });
  }


 onTabClick(tab: string) {
  let notificationType: string = tab ?? '';
  this.getNotifications(notificationType);
}


}
