import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { EventService } from '../../service/event.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
public postId : any
public eventDetails:any
 constructor(private eventService:EventService,private _activatedRoute:ActivatedRoute){
  this._activatedRoute.params.subscribe((res) => {
    this.postId = res['id']
    console.log(this.postId)
  })
 }


 ngOnInit(){
  if(this.postId){
    this.getEventDetails()
  }
 }


 public getEventDetails(){
  this.eventService.getEventDetailsByPostId(this.postId).subscribe({
    next:(res)=>{
      this.eventDetails = res?.data[0] || 'NA'
      console.log(res)
    },
    error:(err)=>{

    }
  })
 }
}
