import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from '../classes/user';
import { Plan } from '../classes/plan';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Activity } from '../classes/activity';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(
    private firebaseService: FirebaseService,

  ) { }


  activities;
  addPlan(user: User, plan: Plan) {

    return new Promise((resolve) => {
      this.firebaseService.addDocument("users/" + user.uid + "/plans", plan).then(() => {
        return resolve();
      })
    })

  }

  deletePlan(user: User, plan: Plan) {
    return new Promise((resolve) => {
      this.firebaseService.deleteDocument("/users/" + user.uid + "/plans/" + plan.id).then(() => {
        return resolve();
      })
    })
  }

  editPlan(user: User, plan: Plan) {

    return new Promise((resolve) => {
      this.firebaseService.setDocument("/users/" + user.uid + "/plans/" + plan.id, plan).then(() => {
        return resolve();
      })
    })
  }


  getActivities(user: User, plan: Plan) {

    let observable = Observable.create(observer => firebase.firestore()
      .collection("/users/" + user.uid + "/plans/" + plan.id + "/activities")
      .get(observer)
    );
    observable.subscribe({
      next(value) { console.log('value', value); }
    });
  }

  addActivity(user: User, plan: Plan, activity: Activity) {
    return new Promise((resolve) => {
      this.firebaseService.addDocument("/users/" + user.uid + "/plans/" + plan.id + "/activities/", activity).then(() => {
        return resolve();
      })
    })
  }



}
