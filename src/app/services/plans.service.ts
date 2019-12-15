import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from '../classes/user';
import { Plan } from '../classes/plan';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(
    private firebaseService: FirebaseService,

  ) { }



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

}
