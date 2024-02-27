import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/manage-event/service/event.service';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {
  public eventsArray:any[]=[]
  constructor(private router:Router,private eventService:EventService){}

  ngOnInit(){
    this.getAddedEvents()
  }

  public addEvent(){
    this.router.navigateByUrl('/add-event')
  }

  public getAddedEvents(){
    this.eventService.getEventsByUserId().subscribe({
      next:(res:any)=>{
        this.eventsArray = res.data
        console.log(res)
      }
    })
  }
}
