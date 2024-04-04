import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomepageService } from '../landing-page/views/service/homepage.service';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2'
import { LoaderComponent } from 'src/app/common-ui'
import { FullPageLoaderService } from '../shared/utils';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [MatSlideToggleModule, MatTooltipModule, NgClass,
    ReactiveFormsModule, FormsModule, LoaderComponent, NgIf],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss'
})
export class NotificationPageComponent {
  public notificationArr: any[] = []
  public activeTab: string = 'all'
  public toggleState: boolean = false
  public loader: boolean = false

  constructor(private notification: HomepageService, private fullPageLoaderService: FullPageLoaderService) { }

  ngOnInit() {
    this.getNotifications()
  }

  onAllMarkRead() {
    if (this.toggleState) {
      const body = {
        read_type: 'all_read'
      }
      this.notification.notificationStatus(body).subscribe({
        next: (res) => {
          console.log("check res", res)
          Swal.fire({
            toast: true,
            text: res.message,
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        },
        error: (res) => {

        }
      })
    }
  }

  markAsArchive(item: any) {
    console.log("mark as archieve", item.id)
    this.fullPageLoaderService.showLoader()
    if (item.id) {
      const body = {
        read_type: 'archive',
        id: item.id
      }
      this.notification.notificationStatus(body).subscribe({
        next: (res) => {
          console.log("check res", res)
          this.getNotifications();
          this.fullPageLoaderService.hideLoader()
          Swal.fire({
            toast: true,
            text: 'mark as archive successfully',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })

        },
        error: (res) => {

        }
      })
    }
  }
  getNotifications(notificationType?: string) {
    // console.log("check the archieve", notificationType)
    this.loader = true
    if (notificationType == 'archive') {
      this.notification.getNotification({ archive: 1 }).subscribe({
        next: (res: any) => {
          this.loader = false
          console.log("check data", res)
          this.notificationArr = res?.data;
        },
        error: (res: any) => {
          this.loader = false
        }
      });
    } else {
      this.notification.getNotification({ notification_type: notificationType }).subscribe({
        next: (res: any) => {
          this.loader = false
          this.notificationArr = res?.data
        },
        error: (err: any) => {
          this.loader = false
        }
      });
    }
  }


  onTabClick(tab: string) {
    this.activeTab = tab
    let notificationType: string = tab ?? '';
    if (notificationType == 'all') {
      this.getNotifications();
    } else {
      this.getNotifications(notificationType);
    }
  }


}
