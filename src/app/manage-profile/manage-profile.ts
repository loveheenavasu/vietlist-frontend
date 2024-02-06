import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import {
  // AuthenticationService,
  LocalStorageService,
  ProfileMenu,
  SidebarService,
} from '@vietlist/shared'
// import { FullPageLoaderService } from '../shared/utils/services/loader.service'
import { EditProfileComponent } from './components'
import { NgClass, NgIf } from '@angular/common'

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [EditProfileComponent, NgIf, NgClass],
  templateUrl: './manage-profile.html',
  styleUrl: './manage-profile.scss',
})
export class ManageProfileComponent {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>

  public sidebarMenu: ProfileMenu[] = []
  public userEmail: any
  public imgUrl: any
  activeIndex: number = 0;

  constructor(
    private sidebarService: SidebarService,
    // private sessionservice: AuthenticationService,
  ) {
    this.getSidebarLinks()
    // const data = this.sessionservice.getUserdata()
    // this.userEmail = data?.user_email
  }

  public getSidebarLinks() {
    this.sidebarService.getSidebarLinks().subscribe((res) => {
      this.sidebarMenu = res
    })
  }

  public handleFileInput(event: any) {
    console.log(event, 'event')
    event.stopPropagation()
    console.log('Checking image path', event)
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()

      reader.readAsDataURL(event.target.files[0])

      reader.onload = (event) => {
        if (event.target) {
          this.imgUrl = event.target.result
          console.log('Image URL:', this.imgUrl)
        }
      }
    }
  }

  public openFileInput(event: any) {
    this.handleFileInput(event)
  }
  addClass(index: number) {
    this.activeIndex = index

  }
}