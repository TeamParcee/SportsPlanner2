import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HelperService } from './helper.service';
import { FirebaseService } from './firebase.service';
import { NavController } from '@ionic/angular';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private helper: HelperService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
  ) {
    this.getUser();
  }



  firebaseUser;
  photoURL;
  cropImage;

  getUser = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        this.firebaseUser = firebaseUser;
        firebase.firestore().doc("/users/" + firebaseUser.uid).onSnapshot((userData: any) => {
          let user: User = userData.data();
          return resolve(user)
        })
      })

    })

  }


  updateProfile(photoURL, displayName) {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updateProfile({
        photoURL: photoURL,
        displayName: displayName
      }).then(() => {
        return resolve()
      }).catch((error) => {
        this.displayError(error)
      })
    })
  }




  createUserData(user: User) {
    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + this.firebaseUser.uid, user).then(() => {
        return resolve()
      })
    })

  }


  getUserFromUid(uid: string) {
    return new Promise((resolve) => {
      return firebase.firestore().doc("/users/" + uid).get().then((userSnap: any) => {
        let user: User = userSnap.data();
        return resolve(user)
      })
    })
  }
  displayError(error) {
    this.helper.okAlert("There was a problem", error.message)
  }


}
