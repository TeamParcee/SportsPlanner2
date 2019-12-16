import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import * as firebase from 'firebase';
import { Activity } from 'src/app/classes/activity';
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
  ) { }

  ngOnInit() {
  }


  plan;
  user: User;
  activities: Activity[];


  async ionViewWillEnter() {
    await this.getUser();
    await this.getPlan();
  }
  async getUser() {
    this.user = await this.userService.getUser() as User;
  }
  async getPlan() {
    return new Promise((resolve)=>{

      this.route.paramMap.subscribe(async (paramMap) => {
        let id = paramMap.get('id');
        this.firebaseService.getDocument("users/" + this.user.uid + "/plans/" + id).then((plan)=>{
          this.plan = plan;
          this.getActivities();
        })
      })
      return resolve()
    })
   
  }

  async getActivities() {
    firebase.firestore().collection("/users/" + this.user.uid + "/plans/" + this.plan.id + "/activities")
      .onSnapshot((activitiesSnap) => {
        let activities = [];
        activitiesSnap.forEach((activity) => {
          activities.push(activity.data())
        })
        this.activities = activities;
      })
  }

}
