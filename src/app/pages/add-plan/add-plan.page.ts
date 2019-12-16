import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/classes/plan';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { PlansService } from 'src/app/services/plans.service';
import { HelperService } from 'src/app/services/helper.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.page.html',
  styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {

  constructor(
    private userService: UserService,
    private planService: PlansService,
    private navCtrl: NavController,
    private timerService: TimerService,
  ) { }

  ngOnInit() {
  }


  plan: Plan = new Plan("", null, 0);
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
      this.plan.datetime = moment(this.plan.isoDatetime).format('llll');
      this.plan.timestamp = this.timerService.getTimeStamp(this.plan.isoDatetime)
      this.planService.addPlan(this.user, this.plan).then(() => {
        this.navCtrl.back()
      })
    }

  }


  isFormCorrect() {
    if (!this.plan.isoDatetime) {
      this.errorDate = true;
      return false;
    } else {
      this.errorDate = false;
    }
    if (!this.plan.isoDatetime) {
      this.errorTime = true;
      return false;
    } else {
      this.errorTime = false
      return true
    }
  }
}
