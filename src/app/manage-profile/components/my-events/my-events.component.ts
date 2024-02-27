import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {

  constructor(private router:Router){}

  public addEvent(){
    this.router.navigateByUrl('/add-event')
  }
}
