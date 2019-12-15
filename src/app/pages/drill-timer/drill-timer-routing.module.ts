import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrillTimerPage } from './drill-timer.page';

const routes: Routes = [
  {
    path: '',
    component: DrillTimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrillTimerPageRoutingModule {}
