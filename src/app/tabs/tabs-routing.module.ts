import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'drill-timer',
        loadChildren: './../pages/drill-timer/drill-timer.module#DrillTimerPageModule'
      }, {
        path: 'plans',
        loadChildren: './../pages/plans/plans.module#PlansPageModule'
      },
      {
        path: '',
        redirectTo: 'drill-timer'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
