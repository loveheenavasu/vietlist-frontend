import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { AutocompleteComponent } from '../shared/utils/googleaddress'
import Swal from 'sweetalert2'
import { AgentService } from './agent.service'
import { MatDialog } from '@angular/material/dialog'
import { ImageModalSwiperComponent } from 'src/app/manage-event/components/image-modal-swiper/image-modal-swiper.component'
import { FullPageLoaderService } from '../shared/utils'
import { ActivatedRoute } from '@angular/router'
import { BusinessService } from 'src/app/manage-business/service/business.service'

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
  templateUrl: './agent-detail.component.html',
  styleUrl: './agent-detail.component.scss',
})
export class AgentDetailComponent {
  agentDetails: any
  latitude: any
  longitude: any
  subject = 'Hello' // Replace with the email subject
  body = 'Hello, I hope you are doing well '
  activeTab: string = 'profile'
  public map: google.maps.Map | null = null // Declare and initialize the map property
  private geocoder?: google.maps.Geocoder
  directionStreet: any
  state: any
  country: any
  city: any
  zipcode: any
  directionLatitude: any
  directionLongitude: any
  currentAddress: any
  isDistanceLoading: any
  businessHour: any
  agentId: any
  public openingHour: any[] = []

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service: AgentService,
    private loader: FullPageLoaderService,
    private _activatedRoute: ActivatedRoute,
    public businessService: BusinessService,
  ) {
    this._activatedRoute.params.subscribe((res) => {
      this.agentId = res['id']
    })
  }

  public openGoogleMapss(address: string) {
    console.log(address, 'address')
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`
    window.open(googleMapsUrl, '_blank')
  }

  public redirectToMail(email: string) {
    const mailToUrl = `mailto:${email}?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(this.body)}`
    window.location.href = mailToUrl
  }

  callNumber(number: string) {
    window.open(`tel:${number}`)
  }

  public scrollTo(elementId: string): void {
    this.activeTab = elementId
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  public getAddress(place: any) {
    this.directionStreet = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.forEach((element: any) => {
      element.types.forEach((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
        }
      })
    })
    this.directionLatitude = place.geometry.location.lat()
    this.directionLongitude = place.geometry.location.lng()
    this.cd.detectChanges()
    this.initMap()
  }

  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      this.map = new google.maps.Map(mapElement, {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
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

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.directionLatitude = position.coords.latitude
          this.directionLongitude = position.coords.longitude
          this.getAddressFromCoords(
            this.directionLatitude,
            this.directionLongitude,
          )
        },
        (error) => {},
      )
    } else {
    }
  }

  public getAddressFromCoords(latitude: number, longitude: number): void {
    const geocoder = new google.maps.Geocoder()
    const latlng = new google.maps.LatLng(latitude, longitude)
    geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.currentAddress = results[0].formatted_address
          this.directionStreet = this.currentAddress
        } else {
        }
      } else {
      }
    })
  }
  distanceToEvent: any
  timeEstimate: any
  eventLocation: any
  public getDistance(): void {
    if (!this.directionLatitude && !this.directionLongitude) {
      Swal.fire({
        toast: true,
        text: 'Address not found.',
        animation: false,
        icon: 'warning',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      const distanceToEvent = this.calculateDistance(
        this.directionLatitude,
        this.directionLongitude,
        this.latitude,
        this.longitude,
      )
      const averageSpeedKmPerHour = 60
      const timeInHours = distanceToEvent / averageSpeedKmPerHour
      const timeInMinutes = Math.round(timeInHours * 60)
      let timeEstimate: string
      if (timeInMinutes < 60) {
        timeEstimate = `${timeInMinutes} minutes`
      } else {
        const hours = Math.floor(timeInMinutes / 60)
        const minutes = timeInMinutes % 60
        timeEstimate = `${hours} hours ${minutes} minutes`
      }
      this.distanceToEvent = distanceToEvent.toFixed(2)
      this.timeEstimate = timeEstimate

      const mapElement: any = document.getElementById('map')
      const map = new google.maps.Map(mapElement, {
        zoom: 7,
        center: { lat: this.directionLatitude, lng: this.directionLongitude },
      })

      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(map)

      const request = {
        origin: this.directionStreet,
        destination: this.eventLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      }

      directionsService.route(request, function (response: any, status: any) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response)
        } else {
        }
      })

      const fromMarker = new google.maps.Marker({
        position: { lat: this.directionLatitude, lng: this.directionLongitude },
        map: map,
        title: 'From',
      })

      const toMarker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: map,
        title: 'To',
      })
    }
  }

  mage = [
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1716908520076-4acd8a09f537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
  ]

  public openDialog(imageData: any, index: number) {
    console.log('click os work', imageData, index)
    if (this.dialog) {
      this.dialog.open(ImageModalSwiperComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'full-screen-modal',
        data: { images: imageData, index },
      })
    }
  }

  public degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  public calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    this.isDistanceLoading = true
    const earthRadius = 6371 // Earth's radius in kilometers
    const dLat = this.degreesToRadians(lat2 - lat1)
    const dLon = this.degreesToRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return distance // Distance in kilometers
  }

  private geocodeAddress(address: string): void {
    if (this.geocoder) {
      this.geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          this.latitude = results[0].geometry.location.lat()
          console.log(results, 'kskskks')
          this.longitude = results[0].geometry.location.lng()
          this.cd.detectChanges()
          this.initMap()
        } else {
          console.error(
            'Geocode was not successful for the following reason: ' + status,
          )
        }
      })
    }
  }

  parse(originalStr: string) {
    if (originalStr) {
      const cleanedStr = originalStr.replace(/\\|"/g, '')
      // Convert the cleaned string to a valid JSON string
      const validJsonStr = `[${cleanedStr
        .split('][')
        .map(
          (arr) =>
            `${arr
              .split(',')
              .map((val) => `"${val.replaceAll(']', '').replaceAll('[', '')}"`)
              .join(',')}`,
        )
        .join(',')}]`
      let arr = JSON.parse(validJsonStr)
      let utc = arr[arr.length - 2] + ' ' + arr[arr.length - 1]
      arr.splice(arr.length - 2, 2)
      arr.push(utc)
      return arr
    }
  }
  getAgentDetails() {
    this.loader.showLoader()
    this.geocoder = new google.maps.Geocoder()
    this.service.GetRealStateAgentDetails(this.agentId).subscribe({
      next: (res) => {
        this.loader.hideLoader()
        this.agentDetails = res?.data
        let addressOnMap = res?.data?.business_address || res?.data?.address
        let { latitude, longitude } = res?.data?.business_address
        if (longitude && latitude) {
          this.latitude = latitude
          this.longitude = longitude
          this.cd.detectChanges()
          this.initMap()
        }
        if (res?.data?.business_hours) {
          this.openingHour = this.businessService.combineMultipleTime(
            this.parse(res?.data?.business_hours),
          )
        }
      },
      error: (err) => {
        this.loader.hideLoader()
      },
    })
  }
  ngOnInit() {
    this.getAgentDetails()
  }
}
