import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatePageComponent } from './modules/run-stepper/pages/calculate-page/calculate-page.component';
import { RunSelectionPageComponent } from './modules/run-stepper/pages/run-selection-page/run-selection-page.component';

const routes: Routes = [
  { path: '', component: RunSelectionPageComponent },
  { path: 'calculate/:id', component: CalculatePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
