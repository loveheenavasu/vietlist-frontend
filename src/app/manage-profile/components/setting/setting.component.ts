import { FullPageLoaderService } from './../../../shared/utils/services/loader.service'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import Swal from 'sweetalert2'
import { ProfileService } from '../../service/profile.service'
import { LoaderComponent } from 'src/app/common-ui'

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  public profileViews!: boolean
  public realTime!: boolean
  public periodicNotify!: boolean
  public blogsView!: boolean
  public profileView = new FormControl()
  public isLoader: boolean = false

  constructor(
    private profileService: ProfileService,
    private fullPageLoader: FullPageLoaderService,
  ) {}

  ngOnInit() {
    this.getAllowedNotification()
  }

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

  public allowNotification() {
    this.isLoader = true
    const body = {
      profile_views: this.profileViews ? 1 : 0,
      real_time_notification: this.realTime ? 1 : 0,
      periodic_notification: this.periodicNotify ? 1 : 0,
      blog_views: this.blogsView ? 1 : 0,
    }

    this.profileService.allowNotificationSetting(body).subscribe({
      next: (res) => {
        this.isLoader = false
        this.getAllowedNotification()
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

  getAllowedNotification() {
    this.fullPageLoader.showLoader()
    this.profileService.getAllowedSetting().subscribe({
      next: (res) => {
        this.fullPageLoader.hideLoader()
        this.profileViews = res.data.profile_views === 1
        this.realTime = res.data.real_time_notification === 1
        this.periodicNotify = res.data.periodic_notification === 1
        this.blogsView = res.data.blog_views === 1
      },
    })
  }
}
