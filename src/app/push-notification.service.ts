import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SERVER_URL = 'http://localhost:3000/subscription';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
 // Otetaan yhteys palvelimeen (server-url)
  constructor(private http: HttpClient) { }
 // Lähetetään sinne post-pyyntö
  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    // http palauttaa observablen 
    // joka on tieto siitä, että jokin tapahtuma tapahtuu jossain vaiheessa.
    // Esim. kun palvelin vastaa pyyntöön, niin observablen kuuntelija saa tiedon
    // siitä, että vastaus on tullut ja sen voi käsitellä.
    return this.http.post(SERVER_URL, subscription);
  }
}
