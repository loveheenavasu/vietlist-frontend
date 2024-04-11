import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showNotification(payload: any): void {
    // Check if the browser supports notifications
    console.log(payload , "payloaddddd")
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      return;
    }

    // Check if the user has granted permission to show notifications
    if (Notification.permission === 'granted') {
      // If permission is granted, show the notification
      this.displayNotification(payload);
    } else if (Notification.permission !== 'denied') {
      // If permission hasn't been granted or denied, request permission
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // If permission is granted after requesting, show the notification
          this.displayNotification(payload);
        }
      });
    }
  }

  private displayNotification(payload: any): void {
    const { title, body } = payload.data; // Assuming your payload has title and body fields
    const notification = new Notification(title, { body });

    // Optional: You can handle click events on the notification
    notification.onclick = (event) => {
      // Handle click event (e.g., navigate to a specific route)
      console.log('Notification clicked', event);
    };

    // Optional: You can handle close events on the notification
    notification.onclose = (event) => {
      console.log('Notification closed', event);
    };
  }
}
