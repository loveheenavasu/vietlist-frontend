import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { EventService } from 'src/app/manage-event/service/event.service';

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
constructor(private eventService:EventService,private _activateRoute:ActivatedRoute){
  this._activateRoute.params.subscribe((res)=>{
   this.postId =  res['id'] 
   if(this.postId){
    this.fetchAllBookings()
   }
  })

}

public fetchAllBookings(){
  this.eventService.getAllBookings(this.postId).subscribe({
    next:(res)=>{
      console.log(res , "Response")
    },
    error:(err)=>{
      
    }
  })
}
}
