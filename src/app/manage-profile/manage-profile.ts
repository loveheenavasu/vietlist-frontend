import { Component, Input } from '@angular/core';
import { LocalStorageService, ProfileMenu, SidebarService } from '@vietlist/shared';
import { EditProfileComponent } from './components';
import { ProfileService } from './service/profile.service';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [EditProfileComponent],
  templateUrl: './manage-profile.html',
  styleUrl: './manage-profile.scss'
})
export class ManageProfileComponent {
  // @Input() emailres: any ;
  emailres: any
  public sidebarMenu: ProfileMenu[] = []
  userEmail: any
  constructor(private sidebarService: SidebarService, private profileDetail: ProfileService) {
    console.log(this.emailres, "emailres")
    this.getSidebarLinks();
    //     const storedUserData = localStorage.getData('vietlist::userdata');
    // console.log()
    //     if (storedUserData) {
    //       this.userEmail = JSON.parse(storedUserData);
    //     }

    //     console.log(this.userEmail, "test")
    // if (typeof localStorage !== 'undefined' && localStorage.getItem('vietlist::userdata')) {
    //   this.userEmail = JSON.parse(localStorage.getItem('vietlist::userdata') as string);
    // }

    // console.log(this.userEmail, "email")
  }

  getSidebarLinks() {
    this.sidebarService.getSidebarLinks().subscribe((res) => {
      this.sidebarMenu = res
      console.log(res)
    })
  }



}
