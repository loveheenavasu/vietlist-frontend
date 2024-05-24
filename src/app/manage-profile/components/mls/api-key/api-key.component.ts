import { ProfileService } from '../../../service/profile.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@vietlist/shared';
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-key',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule , AutocompleteComponent],
  templateUrl: './api-key.component.html',
  styleUrl: './api-key.component.scss'
})
export class ApiKeyComponent {
public mls_api_key = new FormControl('')
public userDetails : any;
public  direction: any

constructor(private profileService:ProfileService,private auth:AuthenticationService,private router:Router){
this.auth.userDetailResponse.subscribe((res)=>{
  this.userDetails = res
  if(this.userDetails?.mls_api_key){
  this.mls_api_key.setValue(this.userDetails.mls_api_key)
  }
})
}

public getAddress(place: any) {
  this.direction = place.formatted_address
}


public setKey(){
  this.profileService.setMlsKey({mls_api_key:this.mls_api_key.value}).subscribe({
    next:(res)=>{
      this.profileService.userDetails().subscribe({
        next:(res)=>{
          console.log(res ,'dewd')
          this.auth.userDetailResponse.next(res.data.user)
        }
      })
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
    error:(err)=>{

    }
  })
}

public sync(){
  this.profileService.syncList({location:this.direction}).subscribe({
    next:(res)=>{
    
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
      this.router.navigateByUrl('/manage-profile/all-synced-listing')
      
    },
    error:(err)=>{

    }
  })
}

}
