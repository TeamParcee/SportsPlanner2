import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
  ) {

    firebase.auth().onAuthStateChanged((user)=>{
      this.user = user;
    })
   }


   public user;



  addDocument(col, obj) {

    return new Promise((resolve) => {
      let id = firebase.firestore().collection(col).doc().id;
      let o = { ...obj }
      o.id = id;
      return firebase.firestore().doc(col + "/" + id).set(o).then(() => {
        resolve(id)
      })
    })
  }

  setDocument(doc, obj) {

    return new Promise((resolve) => {
      firebase.firestore().doc(doc).set(obj).then(() => {
        return resolve()
      })
    })
  }

  updateDocument(doc, obj) {

    return new Promise((resolve) => {
      firebase.firestore().doc(doc).update(obj).then(() => {
        resolve()
      })
    })
  }


  deleteDocument(doc) {
    return new Promise((resolve) => {
      firebase.firestore().doc(doc).delete().then(() => {
        resolve()
      })
    })
  }

  getDocument(doc) {
    return new Promise((resolve) => {
      return firebase.firestore().doc(doc).onSnapshot((snapshot) => {
        return resolve(snapshot.data())
      })
    })
  }

  
}