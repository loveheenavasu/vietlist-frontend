// push-notification.service.ts

import { Injectable } from '@angular/core';

declare var OneSignal: any; // Declare OneSignal to avoid TypeScript errors

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { }

  initOneSignal(): void {
    // Initialize OneSignal
    OneSignal.push(() => {
      OneSignal.init({
        appId: "YOUR_ONESIGNAL_APP_ID",
      });
    });
  }

  subscribeToNotifications(): void {
    // Subscribe to push notifications
    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed:any) => {
        if (isSubscribed) {
          console.log('User subscribed to push notifications!');
        } else {
          console.log('User unsubscribed from push notifications.');
        }
      });
    });
  }
}
