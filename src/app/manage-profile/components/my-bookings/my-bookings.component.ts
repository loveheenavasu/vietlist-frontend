import { Component } from '@angular/core';
import { AuthenticationService, Roles } from '@vietlist/shared';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  public role = Roles;
  public userData:any
  constructor(private authService:AuthenticationService ){
    this.userData = this.authService.getUserdata()
  }

  // public fetchProfileDetail() {
  //   this.profileService.userDetails().subscribe({
  //     next: (res) => {
  //       this.userDetail = res.data.user
  //       alert(this.userDetail)
  //       console.log(this.userDetail , "userDetail")
  //     },
  //     error: (err: any) => {
  //       this.router.navigateByUrl('/login')
  //     },
  //   })
  // }


}
