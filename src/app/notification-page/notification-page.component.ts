import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { Component } from '@angular/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { HomepageService } from '../landing-page/views/service/homepage.service'
import { NgClass, NgIf } from '@angular/common'
import Swal from 'sweetalert2'
import { LoaderComponent } from 'src/app/common-ui'
import { FullPageLoaderService } from '../shared/utils'
import { Router } from '@angular/router'
import { capitalize } from '../shared/capitalize'
import { createSlug } from '../shared/helper'
@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatTooltipModule,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    NgIf,
  ],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.scss',
})
export class NotificationPageComponent {
  public notificationArr: any[] = []
  public activeTab: string = 'all'
  public toggleState: boolean = false
  public loader: boolean = false
  public totalCount?: any
  public count = 1

  constructor(
    private notification: HomepageService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getNotifications()
  }

  onAllMarkRead() {
    const body = {
      read_type: this.toggleState ? 'all_read' : 'all_unread',
    }
    this.notification.notificationStatus(body).subscribe({
      next: (res) => {
        Swal.fire({
          toast: true,
          text: capitalize(res.message),
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 10000,
          timerProgressBar: true,
        })
        this.getNotifications()
      },
      error: (res) => {},
    })
  }

  markAsArchive(item: any) {
    console.log('mark as archieve', item.id)
    this.fullPageLoaderService.showLoader()
    if (item.id) {
      const body = {
        read_type: 'archive',
        id: item.id,
      }
      this.notification.notificationStatus(body).subscribe({
        next: (res) => {
          console.log('check res', res)
          this.getNotifications()
          this.fullPageLoaderService.hideLoader()
          Swal.fire({
            toast: true,
            text: 'mark as archive successfully',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
          })
        },
        error: (res) => {},
      })
    }
  }

  markAsUnarchive(item: any) {
    this.fullPageLoaderService.showLoader()
    if (item.id) {
      const body = {
        read_type: 'unarchive',
        id: item.id,
      }
      this.notification.notificationStatus(body).subscribe({
        next: (res) => {
          this.getNotifications()
          this.fullPageLoaderService.hideLoader()
          Swal.fire({
            toast: true,
            text: 'Unarchive successfully',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
          })
        },
        error: (res) => {},
      })
    }
  }
  public loadMore() {
    this.count++
    this.fullPageLoaderService.showLoader()
    let notificationType
    if (this.activeTab != 'all') {
      notificationType = this.activeTab
    }
    this.notification
      .getNotification({
        limit: 10,
        page_no: this.count,
        notification_type: notificationType,
      })
      .subscribe({
        next: (res: any) => {
          if (res && res.data) {
            if (Array.isArray(res.data)) {
              Array.prototype.push.apply(this.notificationArr, res.data)
            } else {
              this.notificationArr.push(res.data)
            }
            this.fullPageLoaderService.hideLoader()
          }
        },
        error: (res: any) => {
          this.loader = false
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  getNotifications(notificationType?: string) {
    // console.log("check the archieve", notificationType)
    this.fullPageLoaderService.showLoader()
    this.loader = true
    if (notificationType == 'archive') {
      this.notification.getNotification({ archive: 1, limit: 10 }).subscribe({
        next: (res: any) => {
          this.loader = false
          this.notificationArr = res?.data
          this.totalCount = +res?.total_count
          this.fullPageLoaderService.hideLoader()
        },
        error: (res: any) => {
          this.loader = false
          this.fullPageLoaderService.hideLoader()
        },
      })
    } else {
      this.notification
        .getNotification({ notification_type: notificationType, limit: 10 })
        .subscribe({
          next: (res: any) => {
            this.fullPageLoaderService.hideLoader()
            this.loader = false
            this.notificationArr = res?.data
            this.totalCount = +res?.total_count
            if (this.totalCount == 0) {
              this.toggleState = true
            } else {
              this.toggleState = false
            }
          },
          error: (err: any) => {
            this.fullPageLoaderService.hideLoader()
            this.loader = false
          },
        })
    }
  }

  onTabClick(tab: string) {
    this.activeTab = tab
    let notificationType: string = tab ?? ''
    if (notificationType == 'all') {
      this.getNotifications()
    } else {
      this.getNotifications(notificationType)
    }
  }

  goToPage(item: any) {
    let slug = item?.slug ? item.slug : createSlug(item.id, item.post_title)
    if (
      item.notification_type == 'business_listing' ||
      item.notification_type == 'claim_business'
    ) {
      this.router.navigate(['/business-details', slug], {
        state: { isGlobal: true, id: item?.id },
      })
    } else if (item.notification_type == 'event_booking') {
      this.router.navigate(['/event-details', slug], {
        state: { id: item?.id },
      })
    }
    const body = {
      read_type: 'single_read',
      id: item?.id,
    }
    this.notification.notificationStatus(body).subscribe({
      next: (res) => {
        // Swal.fire({
        //   toast: true,
        //   text: res.message,
        //   animation: false,
        //   icon: 'success',
        //   position: 'top-right',
        //   showConfirmButton: false,
        //   timer: 10000,
        //   timerProgressBar: true,
        // })
        this.getNotifications()
      },
      error: (res) => {},
    })
  }
}
