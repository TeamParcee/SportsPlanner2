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
    console.log("hey");
    firebase.firestore().collection("/users/" + this.user.uid + "/plans/" + this.plan.id + "/activities")
      .orderBy("order")
      .onSnapshot((activitySnap) => {
        this.totalTime = 0;
        let activities = [];
        this.orderArray = [];
        let time = moment(this.plan.date).format("LT");
        let minutes = 0;
        let count = 0;
        activitySnap.forEach((activity) => {
          count = count + 1;
          let a = activity.data();
          a.startTime = this.getTimeOfEvent(time, minutes);
          a.date = moment(this.date).format("MMM DD, YYYY ") + a.startTime;
          activities.push(a);
          this.orderArray.push({ order: count, id: a.id });
          time = a.startTime;
          minutes = a.duration;
          this.totalTime = this.totalTime + (minutes * 1);
          this.endTime = this.getTimeOfEvent(time, minutes);
        })
        this.activities = activities;
        this.date = this.plan.date;
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
}