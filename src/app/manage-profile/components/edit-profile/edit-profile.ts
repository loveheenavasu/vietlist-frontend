import { Component } from '@angular/core'
import { ProfileService } from '../../service/profile.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService, ProfileMenu, SidebarService } from '@vietlist/shared'
import { CommonModule } from '@angular/common'
import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service'

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfileComponent {
  public email!: string //
  public userName: string = ''
  public userDetails: any
  public isLoginSucess?: any
  public sidebarMenu: ProfileMenu[] = []
  constructor(
    private profileDetail: ProfileService,
    private router: Router,
    private sessionservice: AuthenticationService,
    private loaderService: FullPageLoaderService,
  ) {

  }
  ngOnInit() {

    this.fetchProfileDetail()
  }

  fetchProfileDetail() {
    this.loaderService.showLoader()
    this.profileDetail.userDetails().subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        if (res) {
          this.email = res.data.user.user_email ? res.data.user.user_email : ' '
          this.userName = res.data?.user?.user_nicename
          console.log('check the email,username', this.userName, this.email)
        }
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }

  fetchUpdateUserProfile() {
    const body = {
      user_email: this.email,
      display_user_name: this.userName,
      user_image: ""
    }
    console.log("check update", body)
    this.profileDetail.userProfileUpdate(body).subscribe({
      next: (res) => {
        console.log("update-profile", res)
      },
      error: (err) => {
        console.log("update profile error", err)
      }
    })
  }

  handleUpdateUser() {
    this.fetchUpdateUserProfile()
  }

}
