import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/classes/plan';
import { PlansService } from 'src/app/services/plans.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import * as firebase from 'firebase';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  constructor(
    private planService: PlansService,
    private userService: UserService,
    private helper: HelperService,
  ) { }


  plans: Plan[];
  user: User;

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();
    await this.getPlans();
  }

  async getUser() {
    this.user = await this.userService.getUser() as User;
  }


  getPlans() {
    firebase.firestore().collection("users/" + this.user.uid + "/plans/")
      .onSnapshot((plansSnap) => {
        let plans = [];
        plansSnap.forEach((plan) => {
          plans.push(plan.data())
        })
        this.plans = plans;
      })
  }

  delete(plan) {
    this.helper.confirmationAlert("Delete Practice Plan", "Are you sure you want to delete this Practice Plan", { denyText: "Cancel", confirmText: "Delete" })
      .then((result) => {
        if (result) {
          this.planService.deletePlan(this.user, plan).then(() => {
          })
        }
      })
  }
}
