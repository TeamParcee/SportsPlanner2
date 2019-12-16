import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/classes/activity';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.page.html',
  styleUrls: ['./view-activity.page.scss'],
})
export class ViewActivityPage implements OnInit {

  constructor(
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }

  activity: Activity


  close() {
    this.helper.closeModal()
  }
}
