import { FullPageLoaderService } from '@vietlist/shared';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/manage-event/service/event.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [DatePipe,TruncateHtmlPipe],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {
  public eventsArray:any[]=[]
  constructor(private router:Router,private eventService:EventService , private fullpageloader:FullPageLoaderService){}

  ngOnInit(){
    this.getAddedEvents()
  }

  public addEvent(){
    this.router.navigateByUrl('/add-event')
  }

  public getAddedEvents(){
    this.fullpageloader.showLoader()
    this.eventService.getEventsByUserId().subscribe({
      next:(res:any)=>{
        this.eventsArray = res.data
        this.fullpageloader.hideLoader()
      },
      error:(err)=>{
        this.fullpageloader.hideLoader()
      }
    })
  }

  public handleDelete(id:any){
    Swal.fire({
      title: 'Do you really want to delete your event ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe({
          next: (res: any) => {
            this.getAddedEvents()
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
            
          },
          error:(err)=>{
            this.fullpageloader.hideLoader()
          }
        })
      }
    })
  }

  public handleEdit(id:any){
    this.router.navigate(['/edit-event/' + id])
  }

  public gotToEventDetails(id:any, isGlobal:any){
    this.router.navigate(['/event-details', id], { queryParams: { isGlobal: isGlobal } });
    
  }

  public navigateToViewBooking(id:any){
    this.router.navigate(['/manage-profile/all-bookings' , id]);
  }
}
