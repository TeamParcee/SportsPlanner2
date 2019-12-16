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



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    QuillModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
