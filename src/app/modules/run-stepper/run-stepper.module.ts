import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { RunSelectionPageComponent } from './pages/run-selection-page/run-selection-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalculatePageComponent } from './pages/calculate-page/calculate-page.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { ResultsComponent } from './components/results/results.component';
import { CalculateAreaComponent } from './components/calculate-area/calculate-area.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    RunSelectionPageComponent,
    CalculatePageComponent,
    ResultsComponent,
    CalculateAreaComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    RouterModule,
    MatDividerModule,
  ],
})
export class RunStepperModule {}
