import { RunStepperModule } from './run-stepper/run-stepper.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RunStepperModule,
    AppRoutingModule,
    MatToolbarModule,
  ],
})
export class AppModule {}
