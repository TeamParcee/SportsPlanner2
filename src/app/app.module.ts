import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { QuillModule } from 'ngx-quill'
import { AddActivityPage } from './pages/add-activity/add-activity.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewActivityPage } from './pages/view-activity/view-activity.page';
import { Media } from '@ionic-native/media/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCsh5-BlQfW-hy45_JD4ATiE0ql8hBrCXs",
  authDomain: "coachingdrilltimer.firebaseapp.com",
  databaseURL: "https://coachingdrilltimer.firebaseio.com",
  projectId: "coachingdrilltimer",
  storageBucket: "coachingdrilltimer.appspot.com",
  messagingSenderId: "24268293516",
  appId: "1:24268293516:web:0542821ed0f75673e682a9",
  measurementId: "G-1C9ZMHV064"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BJvtPdOD0boEU9EuLT1HMeZjLAIB5MJnCduh8bnH9enymAVHiMGVGDWjtzwqumyNluygKAMpBpCJJcEhUplc9Z0");



@NgModule({
  declarations: [
    AppComponent,
    AddActivityPage,
    ViewActivityPage,
  ],
  entryComponents: [
    AddActivityPage,
    ViewActivityPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    Media,
    LocalNotifications,
    BackgroundMode,
    Vibration,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
