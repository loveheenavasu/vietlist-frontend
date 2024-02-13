import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import Swal from 'sweetalert2'
import { ProfileService } from '../../service/profile.service'

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  profileViews!: boolean
  realTime!: boolean
  periodicNotify!: boolean
  blogsView!: boolean
  public profileView = new FormControl()
  // public realTime = new FormControl('');
  // public periodicNotify = new FormControl('');
  // public blogsView = new FormControl('');

  constructor(private profileService: ProfileService) {}
  valueChange(event: any) {
    if (event == 'profileViews') {
      this.profileViews
    } else if (event == 'realTime') {
      this.realTime
    } else if (event == 'periodicNotify') {
      this.periodicNotify
    } else if (event == 'blogsView') {
      this.blogsView
    }
  }
  // public allowNotification() {
  //   const body = {
  //     notification:{
  //     profile_views: this.profileViews ? 1 : 0,
  //     real_time_notification: this.realTime ? 1 : 0,
  //     periodic_notification: this.periodicNotify ? 1 : 0,
  //     blog_views: this.blogsView ? 1 : 0,
  //     }
  //   }

  //   this.profileService
  //     .allowNotificationSetting(body)
  //     .subscribe({
  //       next: (res) => {
  //         Swal.fire({
  //           toast: true,
  //           text: res.message,
  //           animation: false,
  //           icon: 'success',
  //           position: 'top-right',
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //         })
  //       },
  //     })
  // }

  public allowNotification() {
    const body = {
     
        profile_views: this.profileViews ? 1 : 0,
        real_time_notification: this.realTime ? 1 : 0,
        periodic_notification: this.periodicNotify ? 1 : 0,
        blog_views: this.blogsView ? 1 : 0,
     
    }

   

    this.profileService
      .allowNotificationSetting(body)
      .subscribe({
        next: (res) => {
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
      })
  }
}
