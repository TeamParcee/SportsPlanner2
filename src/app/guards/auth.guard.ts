import { Injectable } from '@angular/core';
import {CanLoad } from '@angular/router';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private navCtrl: NavController,
  ){}
  canLoad() {
    return (this.isAuthenticated()) ? true : false;
  }

  
  isAuthenticated() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(true);
        } else {
          this.navCtrl.navigateRoot("/login");
          return resolve(false)
        }
      })
    })
  }
}
