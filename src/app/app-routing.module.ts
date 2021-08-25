import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunStepperPageComponent } from './run-stepper/run-stepper-page/run-stepper-page.component';

const routes: Routes = [{ path: '', component: RunStepperPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
