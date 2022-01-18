import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContrastFinderComponent } from './contrast-finder.component';
import { ColorInputComponent } from './color-input/color-input.component';
import { ColorOutputComponent } from './color-output/color-output.component';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContrastFinderComponent,
    ColorInputComponent,
    ColorOutputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: ContrastFinderComponent}
    ])
  ],
  exports: [
    ContrastFinderComponent
  ]
})
export class ContrastFinderModule { }
