import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor() {}

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })

  formatToUSD(num: any) {
    return this.formatter.format(num)
  }
}
