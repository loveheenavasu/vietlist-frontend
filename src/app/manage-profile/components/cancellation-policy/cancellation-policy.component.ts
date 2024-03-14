import { Component } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared';
@Component({
  selector: 'app-cancellation-policy',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cancellation-policy.component.html',
  styleUrl: './cancellation-policy.component.scss'
})
export class CancellationPolicyComponent {
  title: any
  refund: boolean = false;
  public userDetails : any
  constructor(private profileService: ProfileService, private fullPageLoaderService: FullPageLoaderService,private authService:AuthenticationService) {
   
    this.userDetails = this.authService.getUserdata()
    console.log(this.userDetails.ID)
    this.getcancelpolicy()
  }



  getcancelpolicy() {
    this.fullPageLoaderService.showLoader()
    this.profileService.getcancelpolicy(this.userDetails?.ID).subscribe((res: any) => {
      if (res) {

        this.title = res?.data?.cancellation_policy_title,
          this.refund = res?.data?.cancellation_policy
        this.fullPageLoaderService.hideLoader()
      }
    })
  }
  
  cancelpolicy() {
    this.fullPageLoaderService.showLoader()
    const body = {
      cancellation_policy_title: this.title,
      cancellation_policy: this.refund
    }
    this.profileService.cancelpolicy(body).subscribe((res: any) => {
      if (res) {
        this.fullPageLoaderService.hideLoader()
        this.getcancelpolicy()
        Swal.fire({
          toast: true,
          text: res?.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      }
    })
  }
}
