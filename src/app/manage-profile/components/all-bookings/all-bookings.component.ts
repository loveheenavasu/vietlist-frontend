import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { EventService } from 'src/app/manage-event/service/event.service';
import { FullPageLoaderService } from '@vietlist/shared';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-bookings',
  standalone: true,
  imports: [],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {

public allBookingsArray : any[]=[]
public postId:any

/**
 * 
 * @param eventService 
 */
constructor(private eventService:EventService,private _activateRoute:ActivatedRoute , private fullpageoaderservice:FullPageLoaderService , private router:Router){
  this._activateRoute.params.subscribe((res)=>{
   this.postId =  res['id'] 
   if(this.postId){
    this.fetchAllBookings()
   }
  })

}

public fetchAllBookings(){
this.fullpageoaderservice.showLoader()
  this.eventService.getAllBookings(this.postId).subscribe({
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



public goToDetails(id:any){
  this.router.navigate(['/booking-details/' , id])
}
}
