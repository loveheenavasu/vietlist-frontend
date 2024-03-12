import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, FullPageLoaderService, Roles } from '@vietlist/shared';
import { EventService } from 'src/app/manage-event/service/event.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [],
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
  constructor(private eventService:EventService,private _activateRoute:ActivatedRoute , private fullpageoaderservice:FullPageLoaderService){
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
}
