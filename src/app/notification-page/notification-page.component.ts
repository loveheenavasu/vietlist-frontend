import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomepageService } from '../landing-page/views/service/homepage.service';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2'
import { LoaderComponent } from 'src/app/common-ui'
import { FullPageLoaderService } from '../shared/utils';
import { Router } from '@angular/router';

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
  public totalCount?: any
  public count = 1

  constructor(private notification: HomepageService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,) { }

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
          this.getNotifications();
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

  markAsUnarchive(item: any) {
    this.fullPageLoaderService.showLoader()
    if (item.id) {
      const body = {
        read_type: 'unarchive',
        id: item.id
      }
      this.notification.notificationStatus(body).subscribe({
        next: (res) => {
          console.log("check res", res)
          this.getNotifications();
          this.fullPageLoaderService.hideLoader()
          Swal.fire({
            toast: true,
            text: 'Unarchive successfully',
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
  public loadMore() {
    this.count++
    this.fullPageLoaderService.showLoader()
    let notificationType;
    if (this.activeTab != 'all') {
      notificationType = this.activeTab
    }
    this.notification.getNotification({ limit: 10, page_no: this.count, notification_type: notificationType }).subscribe({
      next: (res: any) => {
        console.log("check data", res)
        if (res && res.data) {
          if (Array.isArray(res.data)) {
            Array.prototype.push.apply(this.notificationArr, res.data);
          } else {
            this.notificationArr.push(res.data);
          }
          this.fullPageLoaderService.hideLoader();
        }
      },
      error: (res: any) => {
        this.loader = false
        this.fullPageLoaderService.hideLoader();
      }
    });
  }

  getNotifications(notificationType?: string) {
    // console.log("check the archieve", notificationType)

    this.loader = true
    if (notificationType == 'archive') {
      this.notification.getNotification({ archive: 1, limit: 10 }).subscribe({
        next: (res: any) => {

          this.loader = false
          console.log("check data", res)
          this.notificationArr = res?.data;
          this.totalCount = +res?.total_count
        },
        error: (res: any) => {
          this.loader = false

        }
      });
    } else {
      this.notification.getNotification({ notification_type: notificationType, limit: 10 }).subscribe({
        next: (res: any) => {
          this.loader = false
          this.notificationArr = res?.data
          this.totalCount = +res?.total_count
          console.log("chgeck ", this.totalCount)
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

  goToPage(item: any) {
    console.log("check", item)
    if (item.notification_type == 'business_listing' || item.notification_type == 'claim_business') {
      this.router.navigate(['/business-details', item.id]);
    } else if (item.notification_type == 'event_booking') {
      this.router.navigate(['/event-details', item.id]);
    }
  }

}
