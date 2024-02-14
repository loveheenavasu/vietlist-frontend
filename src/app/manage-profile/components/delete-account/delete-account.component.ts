import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FullPageLoaderService } from '@vietlist/shared'
import Swal from 'sweetalert2'
import { ProfileService } from '../../service/profile.service'

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styles: `
    p {
      font-size: 18px;
      color: grey;
    }
    .orange-background-btn {
      background: #ff9900;
      width: fit-content;
      padding: 10px 42px;
      color: #fff;
    }
  `,
})
export class DeleteAccountComponent {
  constructor(
    private profileService: ProfileService,
    private router:Router
    
  ) {}

  public handleDeleteAccount() {
    Swal.fire({
      title: 'Do you really want to delete your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteAccount().subscribe({
          next: (res: any) => {
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
            this.router.navigateByUrl('/')
          },
        })
      }
    })
  }
}
