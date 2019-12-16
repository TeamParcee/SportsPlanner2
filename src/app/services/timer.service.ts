import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }





  getTimeStamp(date) {
    return new Date(date).getTime();
  }
}
