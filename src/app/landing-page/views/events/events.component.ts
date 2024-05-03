import { Component, Input } from '@angular/core'
import { EventService } from 'src/app/manage-event/service/event.service'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  @Input() homePageData?: any
  public eventsArray:any[]=[]

  constructor(private eventService:EventService) { }

  ngOnInit() {
    // this.getAllEvents()
  }

  public getAllEvents(){
    this.eventService.getPublishEvents({}).subscribe({
      next:(res)=>{
        this.eventsArray = res?.data
        console.log(res , "response")
      }
    })
  }


}
