import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FullPageLoaderService } from './../../../shared/utils/services/loader.service'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
} from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import Swal from 'sweetalert2'
import { ProfileService } from '../../service/profile.service'
import { LoaderComponent } from 'src/app/common-ui'
import { AuthenticationService, Roles } from '@vietlist/shared'

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
  public Login: boolean = true
  public Subscription: boolean = true
  public delete_account: boolean = true
  public business_listing: boolean = true
  public sync_listing: boolean = true
  public profileView = new FormControl()
  public isLoader: boolean = false
  public userDetails: any
  public userRoles: any = Roles
  private destroyRef = inject(DestroyRef)
  constructor(
    private profileService: ProfileService,
    private fullPageLoader: FullPageLoaderService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.getAllowedNotification()
    this.authService.userDetailResponse
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.userDetails = res
      })
  }

  valueChange(event: any) {
    if (event == 'Login') {
      this.Login
    } else if (event == 'Subscription') {
      this.Subscription
    } else if (event == 'delete_account') {
      this.delete_account
    } else if (event == 'business_listing') {
      this.business_listing
    }
  }

  public allowNotification() {
    this.isLoader = true
    const body = {
      Login: this.Login ? 1 : 0,
      Subscription: this.Subscription ? 1 : 0,
      delete_account: this.delete_account ? 1 : 0,
      business_listing: this.business_listing ? 1 : 0,
      sync_listing: this.sync_listing ? 1 : 0,
    }

    if (this.userDetails?.user_role === Roles.realEstate) {
      body.sync_listing = this.sync_listing ? 1 : 0
    }
    this.profileService.allowNotificationSetting(body).subscribe({
      next: (res) => {
        this.isLoader = false
        this.getAllowedNotification()
        Swal.fire({
          toast: true,
          text:
            res?.message.slice(0, 1).toUpperCase() +
            res?.message.slice(1, res?.message.length),
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 10000,
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
        this.Login = res.data.Login === 1
        this.Subscription = res.data.Subscription === 1
        this.delete_account = res.data.delete_account === 1
        this.business_listing = res.data.business_listing === 1
        this.sync_listing = res.data?.sync_listing === 1
        // this.allowNotification()
      },
    })
  }
}
