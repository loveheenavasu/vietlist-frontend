import { RouterOutlet, RouterLink, Router } from '@angular/router'
import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import {
  AuthenticationService,
  ProfileMenu,
  SidebarService,
} from '@vietlist/shared'
import { EditProfileComponent } from './components'
import { NgClass, NgIf } from '@angular/common'
import { ProfileService } from './service/profile.service'
import { MatTooltipModule } from '@angular/material/tooltip'
@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [
    EditProfileComponent,
    NgIf,
    NgClass,
    RouterOutlet,
    RouterLink,
    MatTooltipModule,
  ],
  templateUrl: './manage-profile.html',
  styleUrl: './manage-profile.scss',
})
export class ManageProfileComponent {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>
  public sidebarMenu: ProfileMenu[] = []
  public userEmail: any
  public imgUrl: any
  public activeIndex: any = 0
  public showFullEmail: boolean = false
  public isUploading: boolean = false
  constructor(
    private sidebarService: SidebarService,
    private sessionservice: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
  ) {
    // this.getSidebarLinks()
    const data = this.sessionservice.getUserdata()
    this.userEmail = data?.user_email
    this.fetchProfileDetail()
    this.activeIndex = this.router.url
    this.sidebarService.getSidebarLinks().subscribe((res) => {
      this.sidebarMenu = res
    })
  }
  

  public isRouteActive(route: string): boolean {
    return this.router.isActive(route, true)
  }

  public handleFileInput(event: any) {
    console.log(event, 'event')
    event.stopPropagation()
    console.log('Checking image path', event)
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()

      reader.readAsArrayBuffer(event.target.files[0])

      reader.onload = (event) => {
        if (event.target) {
          const arrayBuffer = event.target.result as ArrayBuffer
          this.uploadImage(arrayBuffer)
        }
      }
    }
  }

  private uploadImage(arrayBuffer: ArrayBuffer) {
    this.isUploading = true; // Set uploading flag
    console.log('array buffer', arrayBuffer)
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })
    console.log('check blob', blob)

    const formData = new FormData()
    formData.append('user_email', '')
    formData.append('display_user_name', '')
    formData.append('user_image', blob, 'image.jpg')

    this.profileService.userProfileUpdate(formData).subscribe({
      next: (res: any) => {
        this.imgUrl = res.data.user.user_image
        this.fetchProfileDetail()
        this.isUploading = false; // Reset upl
      },
      error: (err: any) => {
          this.isUploading = false; // Reset upl
      },
    })
  }

  public openFileInput(event: any) {
    console.log('checking')
    this.handleFileInput(event)
  }

  public fetchProfileDetail() {
    // this.loaderService.showLoader()
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.imgUrl = res.data.user.user_image
        console.log(res)
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }
  addClass(url: string) {
    // Update the activeIndex when clicking on a menu item
    this.activeIndex = url
  }

  public viewFullEmail() {
    this.showFullEmail = !this.showFullEmail
  }
}
