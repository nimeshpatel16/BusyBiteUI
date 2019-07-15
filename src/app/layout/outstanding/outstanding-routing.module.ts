import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutStandingSummaryComponent } from './out-standing-summary/out-standing-summary.component';
import { OutStandingDetailsComponent } from './out-standing-details/out-standing-details.component';


const routes: Routes = [
  { path: '', component: OutStandingSummaryComponent},
  { path: 'Out-Standing-Details', component: OutStandingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutstandingRoutingModule { }
