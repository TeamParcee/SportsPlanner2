import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
const messaging = firebase.messaging();

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getpermissions();
    // this.tokenRefresh();
  }


  getpermissions() {
    messaging.requestPermission().then((result) => {
      console.log(result, "result");
      messaging.getToken().then((token) => {
        console.log(token, "token")
      })
    })
  }
  notifications() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.', messaging.requestPermission());
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
          if (currentToken) {
            this.sendTokenToServer(currentToken);
            this.updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            this.updateUIForPushPermissionRequired();
            this.setTokenSentToServer(false);
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          this.setTokenSentToServer(false);
        });

      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  tokenRefresh() {
    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        this.setTokenSentToServer(false);
        // Send Instance ID token to app server.
        this.sendTokenToServer(refreshedToken);
        // ...
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
        // this.showToken('Unable to retrieve refreshed token ', err);
      });
    });
  }
  // Callback fired if Instance ID token is updated.



  setTokenSentToServer(currentToken) {
    console.log(currentToken, "set token sent to server")
  }

  sendTokenToServer(currentToken) {
    console.log(currentToken, "send token to server")
  }
  showToken() {

  }

  updateUIForPushEnabled(currentToken) {
    console.log(currentToken, "update ui for push enabled")
  }

  updateUIForPushPermissionRequired() {

  }



}


