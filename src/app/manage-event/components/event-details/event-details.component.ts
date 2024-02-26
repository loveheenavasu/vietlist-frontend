import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core'
import { EventService } from '../../service/event.service'
import { TitleCasePipe } from '@angular/common'
import { FullPageLoaderService } from '@vietlist/shared'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { NgxDropzoneModule } from 'ngx-dropzone'

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [TitleCasePipe , NgxStarRatingModule , NgxDropzoneModule,],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent {
  public rating = 0 
  public postId: any
  public eventDetails: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public latitude: number = 0
  public longitude: number = 0
  public userDetails:any
  constructor(
    private eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private fullPageLoaderService: FullPageLoaderService,
  ) {
    this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
      console.log(this.postId)
    })
  }

  ngOnInit() {
    if (this.postId) {
      this.getEventDetails()
    }
    this.initMap()
  }

  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
          map: this.map,
          title: 'Marker Title',
        })
      }
    } else {
      console.error('Map element not found.')
    }
  }

  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getEventDetailsByPostId(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.eventDetails = res?.data[0] || 'NA'
        this.latitude = this.eventDetails?.latitude,
        this.longitude = this.eventDetails?.longitude
        console.log(res)
      },
      error: (err) => {},
    })
  }
}