import { Component } from '@angular/core'
import { ProfileService } from '../../service/profile.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService, ProfileMenu } from '@vietlist/shared'
import { CommonModule, NgIf } from '@angular/common'
import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import Swal from 'sweetalert2'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxIntlTelInputModule , NgIf],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfileComponent {
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]

  public email!: string //
  public userName: string = ''
  public last_name: string = ''
  public first_name: string = ''
  public contact_details: string = ''
  public userDetails: any
  public isLoginSucess?: any
  public sidebarMenu: ProfileMenu[] = []
  private destroy$ = new Subject<void>()

  constructor(
    private profileDetail: ProfileService,
    private router: Router,
    private loaderService: FullPageLoaderService,
    private sessionservice: AuthenticationService,
  ) {}
  ngOnInit() {
    this.fetchProfileDetail()
  }

  fetchProfileDetail() {
    this.loaderService.showLoader()
    this.profileDetail.userDetails().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        if (res) {
          this.email = res.data.user.user_email ? res.data.user.user_email : ' '
          this.userName = res.data?.user?.user_nicename
          this.last_name = res.data?.user?.last_name
          this.first_name = res.data?.user?.first_name
          this.contact_details = res.data?.user?.contact
        }
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }

  handleUpdateUser() {
    this.loaderService.showLoader()
    const body = {
      user_email: this.email,
      display_user_name: this.userName,
      user_image: '',
      first_name: this.first_name,
      last_name: this.last_name,
      country: this.contact_details,
    }
    console.log('check update', body)
    this.profileDetail.userProfileUpdate(body).subscribe({
      next: (res) => {
        this.sessionservice.userDetailResponse.next(res.data.user)
        this.loaderService.hideLoader()
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
      error: (err) => {},
    })
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
