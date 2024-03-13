import { DatePipe } from '@angular/common';
import { ProfileService } from './../../service/profile.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, FullPageLoaderService, Roles } from '@vietlist/shared';
import { EventService } from 'src/app/manage-event/service/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  public allBookingsArray : any[]=[]
  public postId:any
  
  /**
   * 
   * @param eventService 
   */
  constructor(private eventService:EventService,private _activateRoute:ActivatedRoute , private fullpageoaderservice:FullPageLoaderService , private router:Router, private profileService:ProfileService){
    this._activateRoute.params.subscribe((res)=>{
     this.postId =  res['id'] 
     if(this.postId){
      this.fetchAllBookings()
     }
    })
  
  }

  ngOnInit(){
    this.fetchAllBookings()
  }
  
  public fetchAllBookings(){
  this.fullpageoaderservice.showLoader()
    this.eventService.getMyBooking().subscribe({
      next:(res:any)=>{
        this.fullpageoaderservice.hideLoader()
        this.allBookingsArray = res.data
        console.log( this.allBookingsArray  , "Response")
      },
      error:(err)=>{
        this.fullpageoaderservice.hideLoader()
      }
    })
  }



  public cancelBooking(bookingId:any, eventId:any){
    Swal.fire({
      title: 'Do you really want to cancel this booking ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          event_id:eventId,
          booking_id:bookingId
        }
        this.eventService.cancelEventBooking(body).subscribe({
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
            this.fetchAllBookings()
          },
        })
      }
    })
  }


public goToDetails(id:any){
  this.router.navigate(['/booking-details/' , id])
}
}
