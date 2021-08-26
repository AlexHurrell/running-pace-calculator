import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatePageComponent } from './modules/run-stepper/calculate-page/calculate-page.component';
import { RunSelectionPageComponent } from './modules/run-stepper/run-selection-page/run-selection-page.component';

const routes: Routes = [
  { path: '', component: RunSelectionPageComponent },
  { path: 'calculate/:id', component: CalculatePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
