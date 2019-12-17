import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { TimerService } from 'src/app/services/timer.service';
import { Plan } from 'src/app/classes/plan';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-drill-timer',
  templateUrl: './drill-timer.page.html',
  styleUrls: ['./drill-timer.page.scss'],
})
export class DrillTimerPage implements OnInit {

  constructor(
    private userService: UserService,
    private timerService: TimerService,
    private plansService: PlansService,
  ) { }



  user: User;
  plan: Plan;
  activities;
  showTimer: boolean;
  timerStarted;
  timerInterval;
  nextActivity;
  currentActivity;

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.stopTimer();
    await this.getUser();
    await this.getNextPlan();

  }

  async ionViewWillLeave() {
    console.log("leaving");
    this.stopTimer();
  }
  async getUser() {
    this.user = await this.userService.getUser() as User;
  }

  getNextPlan() {
    console.log("hey");
    let currentTime = this.timerService.getTimeStamp(new Date());
    firebase.firestore().collection("/users/" + this.user.uid + "/plans/")
      .where("endTimestamp", ">=", currentTime)
      .orderBy('endTimestamp')
      .limit(1).onSnapshot((planSnapshot) => {
        if (planSnapshot.size == 1) {
          this.plan = planSnapshot.docs[0].data() as Plan;
          planSnapshot.docs[0].ref.collection("activities")
            .orderBy("order")
            .onSnapshot((activitiesSnap) => {
              let activities = [];
              activitiesSnap.forEach((activity) => {
                let a = { ...activity.data() }
                a.date = moment(this.plan.date, "ddd, MMM DD, YYYY").format("MMM DD, YYYY ") + a.startTime;
                activities.push(a)
              })
              this.activities = activities;
              this.plansService.activities = activities;
              this.runTimer();
            })
        } else {
          console.log("none")
        }

      })
  }


  runTimer() {
    
    this.showTimer = true;
    if (!this.timerStarted) {
      this.timerStarted = true;
      this.timerService.startPlan();
      this.timerInterval = setInterval(() => {
        this.nextActivity = this.timerService.nextActivity;
        this.currentActivity = this.timerService.currentActivity;
      }, 1000)
    }
  }
  stopTimer() {
    this.timerService.stopPlan();
    clearInterval(this.timerInterval);
    this.showTimer = false;
    this.timerStarted = false;
  }
}
