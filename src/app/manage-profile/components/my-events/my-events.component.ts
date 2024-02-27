import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { FullPageLoaderService, AuthenticationService } from '@vietlist/shared';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {
  Alleventslist: any
  constructor(private router: Router, private profileDetail: ProfileService,
    private loaderService: FullPageLoaderService,
    private sessionservice: AuthenticationService,) {
    this.fetchDetailEvents()
  }

  public addEvent() {
    this.router.navigateByUrl('/add-event')
  }
  public gotToEventDetails(id:any, isGlobal:any){
    this.router.navigate(['/event-details', id], { queryParams: { isGlobal: isGlobal } });

  }
  fetchDetailEvents() {
    this.loaderService.showLoader()
    this.profileDetail.AllEventsList().subscribe({
      next: (res) => {
        console.log(res, 'resresresres')
        this.Alleventslist = res.data[0]
        this.loaderService.hideLoader()
        if (res) {
          // this.email = res.data.user.user_email ? res.data.user.user_email : ' '
          // this.userName = res.data?.user?.user_nicename
          // this.last_name = res.data?.user?.last_name
          // this.first_name = res.data?.user?.first_name
          // this.contact_details = res.data?.user?.contact
        }
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }
}
