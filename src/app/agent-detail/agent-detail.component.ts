import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { AutocompleteComponent } from '../shared/utils/googleaddress'
import Swal from 'sweetalert2'

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
  directionStreet: any
  state: any
  country: any
  city: any
  zipcode: any
  directionLatitude: any
  directionLongitude: any
  currentAddress: any
  isDistanceLoading: any
  constructor(private cd: ChangeDetectorRef) {}

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
          // Update input field value here
          this.directionStreet = this.currentAddress
          // Optionally, you can also trigger change detection manually
          // this.cd.detectChanges();
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
}
