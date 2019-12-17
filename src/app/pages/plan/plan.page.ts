import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import * as firebase from 'firebase';
import { Activity } from 'src/app/classes/activity';
import { HelperService } from 'src/app/services/helper.service';
import { AddActivityPage } from '../add-activity/add-activity.page';
import { ViewActivityPage } from '../view-activity/view-activity.page';
import * as moment from 'moment';
import { TimerService } from 'src/app/services/timer.service';
import { PlansService } from 'src/app/services/plans.service';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private helper: HelperService,
    private timerService: TimerService,
    private plansService: PlansService,
  ) { }

  ngOnInit() {
  }


  plan;
  user: User;
  activities: Activity[];
  orderArray;
  totalTime;

  date;
  endTime;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getPlan();
  }
  async getUser() {
    this.user = await this.userService.getUser() as User;
  }
  async getPlan() {
    return new Promise((resolve) => {

      this.route.paramMap.subscribe(async (paramMap) => {
        let id = paramMap.get('id');
        this.firebaseService.getDocument("users/" + this.user.uid + "/plans/" + id).then((plan) => {
          this.plan = plan;
          this.getActivities();
        })
      })
      return resolve()
    })

  }

  async getActivities() {
    firebase.firestore().collection("/users/" + this.user.uid + "/plans/" + this.plan.id + "/activities")
      .orderBy("order")
      .get().then((activitySnap) => {
        this.totalTime = 0;
        let activities = [];
        this.orderArray = [];
        let time = moment(this.plan.datetime).format("LT");
        let minutes = 0;
        let count = 0;
        activitySnap.forEach((activity) => {
          count = count + 1;
          let a = activity.data();
          a.startTime = this.getTimeOfEvent(time, minutes);
          activities.push(a);
          this.orderArray.push({ order: count, id: a.id });
          time = a.startTime;
          minutes = a.duration;
          this.totalTime = this.totalTime + (minutes * 1);
          this.endTime = this.getTimeOfEvent(time, minutes);
          activity.ref.update({ startTime: time });
        })
        if (this.endTime) {
          this.updateEndTime();
        }
        this.activities = activities;
      })



  }


  addActivity() {
    this.helper.openModal(AddActivityPage, { plan: this.plan })
  }

  editActivity(activity) {
    this.helper.openModal(AddActivityPage, { plan: this.plan, activity: activity, edit: true })
  }

  viewNotes(activity) {
    this.helper.openModal(ViewActivityPage, { activity: activity })
  }


  reorderItems(ev) {
    let from = ev.detail.from;
    let to = ev.detail.to;
    let draggedItem = this.orderArray.splice(from, 1)[0];
    this.orderArray.splice(to, 0, draggedItem);
    let count = 0;
    this.orderArray.forEach((item) => {
      count = count + 1;
      item.order = count;

    })
    ev.detail.complete();

    this.updateOrder();

  }

  updateOrder() {

    this.orderArray.forEach((activity) => {
      firebase.firestore().doc("/users/" + this.user.uid + "/plans/" + this.plan.id + "/activities/" + activity.id).update({ order: activity.order })
    })
  }


 
  getTimeOfEvent(time, minutes) {
    let x = moment(time, "hh:mm a").add('minutes', minutes).format('LT');
    return x;
  }

  updateTime() {
    let time = {
      date: moment(this.plan.isoDatetime).format('ddd, MMM DD, YYYY'),
      isoDatetime: this.plan.isoDatetime,
      datetime: moment(this.plan.isoDatetime).format('llll'),
      timestamp: this.timerService.getTimeStamp(this.plan.isoDatetime)
    }


    this.firebaseService.updateDocument("/users/" + this.user.uid + "/plans/" + this.plan.id, time);
    this.getPlan();
  }

  updateEndTime(){
    let isoEndTime = moment(this.plan.date + " " + this.endTime, "ddd, MMM DD, YYYY, h:m A").format();
    this.firebaseService.
    updateDocument("/users/" + this.user.uid + "/plans/" + this.plan.id, { endTime: this.endTime, isoEndTime: isoEndTime, endTimestamp: this.timerService.getTimeStamp(isoEndTime) })

  }
}