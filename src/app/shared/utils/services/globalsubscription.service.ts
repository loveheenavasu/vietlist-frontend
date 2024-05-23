import { Injectable, ApplicationRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSubscriptionService {
  private subscriptions: Subscription[] = [];

  constructor(private appRef: ApplicationRef) {
    this.appRef.isStable.subscribe(stable => {
      if (stable) {
        console.log('Application is stable. Unsubscribing from all subscriptions.');
        this.unsubscribeAll();
      }
    });
  }

  add(subscription: Subscription): void {
    console.log('Adding subscription');
    this.subscriptions.push(subscription);
    console.log(this.subscriptions , "arraysubscription")
  }

  private unsubscribeAll(): void {
    console.log('Unsubscribing from all subscriptions');
    console.log(this.subscriptions , "subscriptionArrayyyy")
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
    console.log(this.subscriptions , "subscriptionArray")
  }
}
