import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
//@ts-ignore
import {} from '@types/googlemaps'
import { AuthenticationService } from './services'

@Component({
  selector: 'AutocompleteComponent',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      class="input-control"
      type="text"
      [(ngModel)]="autocompleteInput"
      #addresstext
      style="padding: 12px 20px; border: 1px solid #ccc;"
    />
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType!: string
  @Input() set value(val: string) {
    this.autocompleteInput = val || ''
  }
  @Output() setAddress: EventEmitter<any> = new EventEmitter()
  @ViewChild('addresstext') addresstext: any
  country: any
  autocompleteInput!: string
  queryWait!: boolean

  constructor(private behavior: AuthenticationService) {
    this.behavior.clearLocationValue.subscribe((res:any)=>{
      if(res){
       this.autocompleteInput = ''
      }
    })
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete()
  }


  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        // componentRestrictions: { country: 'US' },
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      },
    )
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      console.log(autocomplete)
      const place = autocomplete.getPlace()
      this.invokeEvent(place)
      // Trigger reverse geocoding
      if (place && place.geometry) {
        this.reverseGeocode(
          place.geometry.location.lat(),
          place.geometry.location.lng(),
        )
      }
    })

    // Add keyup event listener for manual address input
    this.addresstext.nativeElement.addEventListener('keyup', () => {
      // Trigger reverse geocoding
      this.reverseGeocodeFromAddress()
    })
  }
  private reverseGeocode(latitude: number, longitude: number) {
    const geocoder = new google.maps.Geocoder()
    const latlng = { lat: latitude, lng: longitude }
    geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results && results[0]) {
          const country = results[0].address_components.find((component: any) =>
            component.types.includes('country'),
          )
          if (country) {
            this.country = country.long_name
          } else {
            console.log('Country component not found in geocoding response')
          }
        } else {
          console.log('No results found in geocoding response')
        }
      } else {
        console.log('Geocoder failed due to:', status)
      }
    })
  }

  private reverseGeocodeFromAddress() {
    const address = this.autocompleteInput
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: address }, (results: any, status: any) => {
      if (status === 'OK' && results && results.length > 0) {
        const country = results[0].address_components.find((component: any) =>
          component.types.includes('country'),
        )
        if (country) {
          console.log('Country:', country.long_name)
        } else {
          console.log('Country component not found in geocoding response')
        }
      } else {
        console.log('Geocoder failed due to:', status)
      }
    })
  }

  // private reverseGeocode(latitude: number, longitude: number) {
  //     const geocoder = new google.maps.Geocoder();
  //     const latlng = { lat: latitude, lng: longitude };
  //     geocoder.geocode({ 'location': latlng }, (results, status) => {
  //         if (status === 'OK') {
  //             if (results && results[0]) {
  //                 const country = results[0].address_components.find(component =>
  //                     component.types.includes('country')
  //                 );
  //                 if (country) {
  //                     this.country = country.long_name
  //                     console.log('Country:', country.long_name);
  //                     this.getRegionsByCountry(country.long_name);
  //                 } else {
  //                     console.log('Country component not found');
  //                 }
  //             } else {
  //                 console.log('No results found');
  //             }
  //         } else {
  //             console.log('Geocoder failed due to: ' + status);
  //         }
  //     });
  // }
  // private getRegionsByCountry(country: string) {
  //     const geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ 'address': country }, (results, status) => {
  //         if (status === 'OK') {
  //             const countryResult = results.find(result =>
  //                 result.types.includes('country')
  //             );
  //             if (countryResult) {
  //                 const administrativeAreaLevels = countryResult.address_components.filter(component =>
  //                     component.types.includes('administrative_area_level')
  //                 );
  //                 const regions = administrativeAreaLevels.map(area => area.long_name);
  //                 console.log('Regions:', regions);
  //             } else {
  //                 console.log('Country not found in geocoder response');
  //             }
  //         } else {
  //             console.log('Geocoder failed due to: ' + status);
  //         }
  //     });
  // }
  // private reverseGeocodeFromAddress() {
  //     const address = this.autocompleteInput;
  //     const geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ 'address': address }, (results, status) => {
  //         if (status === 'OK' && results && results.length > 0) {
  //             const country = results[0].address_components.find(component =>
  //                 component.types.includes('country')
  //             );
  //             if (country) {
  //                 console.log('Country:', country.long_name);
  //                 this.getRegionsByCountry(country.long_name);
  //             } else {
  //                 console.log('Country component not found');
  //             }
  //         } else {
  //             console.log('Geocoder failed due to: ' + status);
  //         }
  //     });
  // }

  // private getPlaceAutocomplete() {
  //     const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
  //         {
  //             componentRestrictions: { country: 'US' },
  //             types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
  //         });
  //     google?.maps.event.addListener(autocomplete, 'place_changed', () => {
  //         const place = autocomplete.getPlace();
  //         this.invokeEvent(place);
  //     });
  // }

  // private getCountryFromLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //                 this.reverseGeocode(position.coords.latitude, position.coords.longitude);
  //             },
  //             (error) => {
  //                 console.log('Error getting location:', error);
  //             }
  //         );
  //     } else {
  //         console.log('Geolocation is not supported by this browser.');
  //     }
  // }

  // private reverseGeocode(latitude: number, longitude: number) {
  //     const geocoder = new google.maps.Geocoder();
  //     const latlng = { lat: latitude, lng: longitude };
  //     geocoder.geocode({ 'location': latlng }, (results, status) => {
  //         if (status === 'OK') {
  //             if (results && results[0]) {
  //                 const country = results[0].address_components.find(component =>
  //                     component.types.includes('country')
  //                 );
  //                 if (country) {
  //                     console.log('Country:', country.long_name);
  //                 } else {
  //                     console.log('Country component not found');
  //                 }
  //             } else {
  //                 console.log('No results found');
  //             }
  //         } else {
  //             console.log('Geocoder failed due to: ' + status);
  //         }
  //     });
  // }

  invokeEvent(place: Object) {
    this.setAddress.emit(place)
  }
}
