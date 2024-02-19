import { LoaderComponent } from './../../../common-ui/loader/loader.component';
import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { Component } from '@angular/core'
import Swal from 'sweetalert2';
import { FullPageLoaderService } from '@vietlist/shared';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [MatSelectModule, MatCheckboxModule , FormsModule , ReactiveFormsModule , LoaderComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {
  public privacyForm:FormGroup
  isLoader:boolean = false
  constructor(private fb:FormBuilder,private profieService:ProfileService , private loaderService:FullPageLoaderService){
  this.privacyForm = this.fb.group({
    listing_privacy : ['Anyone (Default)'],
    hide_profile:['']
  })
  }

  ngOnInit(){
    this.getSetPrivacy()
  }

  handleSubmit(){
    this.isLoader = true
    this.profieService.setPrivacy(this.privacyForm.value).subscribe({
      next:(res)=>{
        this.isLoader = false
        this.getSetPrivacy()
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
      }
    })
  }

  getSetPrivacy(){
    this.loaderService.showLoader()
    this.profieService.getPrivacy().subscribe({
      next:(res)=>{
        this.loaderService.hideLoader()
        if(res){
          this.privacyForm.patchValue({
            listing_privacy:res.data?.listing_privacy,
            hide_profile:res.data?.hide_profile
          })
        }
      }
    })
  }
}
