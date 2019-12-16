import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { TimerService } from 'src/app/services/timer.service';
import { Plan } from 'src/app/classes/plan';

@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private userService: UserService,
    private timerService: TimerService,
  ) { }



  user: User;
  plan: Plan
  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();
    await this.getNextPlan();
  }

  async getUser() {
    this.user = await this.userService.getUser() as User;
  }

  getNextPlan() {
    let today = this.timerService.getTimeStamp(new Date());
    firebase.firestore().collection("/users/" + this.user.uid + "/plans/")
      .where("timestamp", ">=", today)
      .orderBy('timestamp')
      .limit(1).onSnapshot((planSnapshot) => {
        if (planSnapshot.size == 1) {
          this.plan = planSnapshot.docs[0].data() as Plan;
          console.log(this.plan.datetime)
        } else {
          console.log("none")
        }

      })
  }
}
