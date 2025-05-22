import { Component } from '@angular/core';
import { MapComponent } from "./map/map.component";
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

const VAPID_PUBLIC_KEY = "BDZVqn-aA_TYvOzanTcSmok8KqEcTmzG5RtqI_4rf4p8j9itn0Zuw6KbT5m2jxtyZ3AwlmV4BXL6x9T7rh_vhRo";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent {
  title = 'ang-pwakartta_no_SSR';

  constructor(swPush: SwPush, pushService: PushNotificationService) {
  if (swPush.isEnabled) {
    swPush.requestSubscription({
      serverPublicKey: VAPID_PUBLIC_KEY
    })
    .then((subscription) => {
      // Lähetetään subscription palvelimeen
      // sendSubscriptionToTheServer Palauttaa observablen joka tilataan välittömästi
      pushService.sendSubscriptionToTheServer(subscription).subscribe();
      console.log('Subscription successful:', subscription);
    })
    .catch((error) => {
      console.error('Subscription failed:', error);
    });
  }
   }


}
