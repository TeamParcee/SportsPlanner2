import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/classes/plan';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { PlansService } from 'src/app/services/plans.service';
import { HelperService } from 'src/app/services/helper.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  constructor(
    private userService: UserService,
    private planService: PlansService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  plan: Plan = new Plan("", null, null, 0);
  user: User;
  errorTime;
  errorDate;

  ionViewWillEnter() {
    this.getUser()
  }
  async getUser() {
    this.user = await this.userService.getUser() as User;
  }

  save() {

    if (this.isFormCorrect()) {
      this.planService.addPlan(this.user, this.plan).then(() => {
        this.navCtrl.back()
      })
    }

  }


  isFormCorrect() {
    if (!this.plan.date) {
      this.errorDate = true;
      return false;
    } else {
      this.errorDate = false;
    }
    if (!this.plan.startTime) {
      this.errorTime = true;
      return false;
    } else {
      this.errorTime = false
      return true
    }
  }
}
