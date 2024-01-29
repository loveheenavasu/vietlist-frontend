import { Component } from '@angular/core'
import { ProfileService } from '../../service/profile.service'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { ProfileMenu, SidebarService } from '@vietlist/shared'
import { CommonModule } from '@angular/common'

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
    private router: Router
  ) {
  
  }
  ngOnInit() {

    this.fetchProfileDetail()
  }

  fetchProfileDetail() {
    this.profileDetail.userDetails().subscribe({
      next: (res) => {
        if (res) {
          this.email = res.data.user.user_email ? res.data.user.user_email : ' '
          this.userName = res.data?.user?.user_nicename
          console.log('check the email,username', this.userName, this.email)
        }
      },
      error: (err:any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }


}
