import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/classes/activity';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { Plan } from 'src/app/classes/plan';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private helper: HelperService,
  ) {
    if (!this.activity) {
      this.activity = new Activity("", "", 0, "", "", 1000)
    }
  }

  activity: Activity;
  user: User;
  plan: Plan;
  errorName;
  errorDuration;
  edit: boolean;
  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser();

  }
  async getUser() {
    this.user = await this.userService.getUser() as User;
  }
  save() {
    if (!this.validateForm) {
      return
    }
    if (!this.edit) {
      this.firebaseService.addDocument("users/" + this.user.uid + "/plans/" + this.plan.id + "/activities", this.activity).then(() => {
        this.close();
      })
    }

    if (this.edit) [
      this.firebaseService.setDocument("users/" + this.user.uid + "/plans/" + this.plan.id + "/activities/" + this.activity.id, this.activity).then(() => {
        this.close();
      })
    ]

  }

  validateForm() {
    if (!this.activity.name) {
      this.errorName = true;
      return false
    } else {
      this.errorName = false;
    }
    if (!this.errorDuration) {
      this.errorDuration = true;
      return false
    } else {
      this.errorDuration = false;
      return true
    }

  }
  close() {
    this.helper.closeModal()
  }
}
