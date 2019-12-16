import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmEmailGuard } from './guards/confirm-email.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule), canLoad: [AuthGuard, ConfirmEmailGuard]
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then( m => m.PlansPageModule)
  },
  {
    path: 'drill-timer',
    loadChildren: () => import('./pages/drill-timer/drill-timer.module').then( m => m.DrillTimerPageModule)
  },
  {
    path: 'add-plan',
    loadChildren: () => import('./pages/add-plan/add-plan.module').then( m => m.AddPlanPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'confirm-email',
    loadChildren: () => import('./pages/confirm-email/confirm-email.module').then( m => m.ConfirmEmailPageModule)
  },  {
    path: 'plan',
    loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./pages/activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'add-activity',
    loadChildren: () => import('./pages/add-activity/add-activity.module').then( m => m.AddActivityPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
