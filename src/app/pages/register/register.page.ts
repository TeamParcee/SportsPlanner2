import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../classes/user';
import { NavController } from '@ionic/angular';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
  ) {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.minLength(2)]],
      lname: ['', [Validators.minLength(2)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
      isHeadCoach: [false,]
    })
  }

  ngOnInit() {
  }

  registerForm: FormGroup;

  createAccount() {
    let form = this.registerForm.value;
    let currentTime = moment.tz('America/Chicago').format('MMMM Do YYYY, h:mm:ss a');
    let photoURL = "../../assets/images/default-user.png";
    let user = new User(form.fname, form.lname, "", form.email, currentTime, photoURL);
    this.authService.createUserWitEmail(form.email, form.password).then((firebaseUser: firebase.User) => {
      user.uid = firebaseUser.uid;
      this.firebaseService.setDocument("/users/" + firebaseUser.uid, { ...user }).then(() => {
        this.navCtrl.navigateForward("/confirm-email");
    })
  })
}

  
}
