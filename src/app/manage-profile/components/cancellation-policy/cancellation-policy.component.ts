import { Component } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FullPageLoaderService } from '@vietlist/shared';
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
  constructor(private profileService: ProfileService, private fullPageLoaderService: FullPageLoaderService,) {
    this.getcancelpolicy()
  }


  getcancelpolicy() {
    this.fullPageLoaderService.showLoader()
    this.profileService.getcancelpolicy().subscribe((res: any) => {
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
          text: res?.data,
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
