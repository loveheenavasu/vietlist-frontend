import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AuthenticationService, Roles } from '@vietlist/shared'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-benefits-of-joining',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './benefits-of-joining.component.html',
  styleUrl: './benefits-of-joining.component.scss',
})
export class BenefitsOfJoiningComponent {
  public userRole: string = ''
  public subscriptionStatus: boolean = false
  public checkAuthentication:any
  constructor(
    private router: Router,
    private sessionservice: AuthenticationService,
  ) {
    this.sessionservice.isAuthenticated$.subscribe((res)=>{
      this.checkAuthentication = res
      console.log(this.checkAuthentication,'checkAuthentication')
    })

    this.sessionservice.userRole.subscribe((res) => {
      this.userRole = res
    })
    const data = this.sessionservice.getUserdata()
    // console.log("check role1", data)
    if (data) {
      this.userRole = data?.user_role
      // console.log("check role", data)
    }
    this.sessionservice.isSubscription$.subscribe((res) => {
      this.subscriptionStatus = res
      // console.log("check the subscription status", this.subscriptionStatus)
    })

   
  }

  backToLogin() {
    this.router.navigateByUrl('/login')
  }

  addBusiness() {
    console.log('check ---->', Roles.subscriber)
    if (this.userRole == Roles.subscriber) {
      console.log('check1 ---->')
      this.router.navigateByUrl('/register')
    } else if (
      this.userRole == Roles.businessOwner &&
      !this.subscriptionStatus
    ) {
      // console.log("check2")
      console.log('check2 ---->')
      Swal.fire({
        toast: true,
        text: 'Please choose plan',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      this.router.navigateByUrl('/subscription-plans')
    } else if (
      this.userRole == Roles.businessOwner &&
      this.subscriptionStatus
    ) {
      console.log('check3 ---->')
      this.router.navigateByUrl('/list-business')
    } else if (!this.userRole) {
      console.log('check3 ---->')

      this.router.navigateByUrl('/login')
    }
  }
}
