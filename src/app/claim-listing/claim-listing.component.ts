import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';

@Component({
  selector: 'app-claim-listing',
  standalone: true,
  imports: [   NgxIntlTelInputModule,MatSelectModule],
  templateUrl: './claim-listing.component.html',
  styleUrl: './claim-listing.component.scss'
})
export class ClaimListingComponent {
  public separateDialCode = true
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]

}
