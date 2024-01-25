import { Component } from '@angular/core';
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
public sidebarMenu : ProfileMenu[] = []
userEmail:any
constructor(private sidebarService:SidebarService, private profileDetail : ProfileService , private localStorage:LocalStorageService){
  this.getSidebarLinks()
  this.userEmail = JSON.parse(localStorage.getData('vietlist::userdata') as string)

}



getSidebarLinks(){
  this.sidebarService.getSidebarLinks().subscribe((res)=>{
    this.sidebarMenu = res
    console.log(res)
  })
}



}
