import { Component, Input } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/shared/utils/services/user-session.service';
import { ProfileMenu, SidebarService } from '@vietlist/shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss'
})
export class EditProfileComponent {

  // showUserProfile:any
  @Input() emailres!: any;
  email!: string; //
  userName: string = ''
  public userDetails: any
  public isLoginSucess?: any
  public sidebarMenu: ProfileMenu[] = []
  constructor(private profileDetail: ProfileService, private sidebarService: SidebarService, private router: Router, private userSessionService: UserSessionService) {
    this.userSessionService.isSuccessLogin.subscribe(val => {
      this.isLoginSucess = val
    })
  }
  ngOnInit() {
    console.log(this.isLoginSucess, "loginResponse")
    if (this.isLoginSucess) {
      this.fetchProfileDetail()
    }
    this.getSidebarLinks();
  }


  fetchProfileDetail() {
    this.profileDetail.profileData().subscribe({
      next: (res) => {
        if (res) {
          this.email = res.data.user.user_email ? res.data.user.user_email : ' '
          this.userName = res.data?.user?.user_nicename
          console.log("check the email,username", this.userName, this.email)
        }
      },
      error: (err) => {
        this.router.navigateByUrl('/login')
      }

    })
  }



  getSidebarLinks() {
    this.sidebarService.getSidebarLinks().subscribe((res) => {
      this.sidebarMenu = res
      console.log(res)
    })
  }

}
