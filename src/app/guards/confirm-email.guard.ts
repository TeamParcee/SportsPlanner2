import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanLoad {
  
  constructor(
    private navCtrl: NavController,
    private router: Router,
  ){}
  async canLoad(){
    if(await this.getEmailVerified()){
      return true
    } else {
      this.router.navigateByUrl("confirm-email")
    }
  }

  getEmailVerified(){
    return new Promise((resolve)=>{
      firebase.auth().onAuthStateChanged((user)=>{
        return resolve(user.emailVerified)
      })
    })
  }
}
