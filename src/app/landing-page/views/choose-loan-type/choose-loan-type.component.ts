import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthenticationService, Roles } from '@vietlist/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-choose-loan-type',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatButtonModule],
  templateUrl: './choose-loan-type.component.html',
  styleUrl: './choose-loan-type.component.scss'
})
export class ChooseLoanTypeComponent {
  public isAuthenticated:any;
  public userResponse:any;

  constructor(private router:Router,private authService:AuthenticationService){
    this.authService.isAuthenticated$.subscribe((res)=>{
      this.isAuthenticated = res
      if(this.isAuthenticated){
        this.authService.userDetailResponse.subscribe((res)=>{
          this.userResponse = res
          console.log(this.userResponse ,  "resresresres")
        })
      }
    })
  }

  public navigateTo(url:any){
    this.router.navigateByUrl(url)
  }

  public navigateOnSyncListing(){
    if(this.isAuthenticated && this.userResponse?.user_role == Roles.realEstate){
      this.router.navigateByUrl('/manage-profile/all-synced-listing')
  }else{
    Swal.fire({
      toast: true,
      text: 'You have to register as a Real Estate to access this page',
      animation: false,
      icon: 'warning',
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}

}
