import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrastDetailsComponent } from './contrast-details.component';
import { RouterModule } from '@angular/router';
import { ColorService } from '../color.service';


@NgModule({
  declarations: [
    ContrastDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'details/:foreground/:background', component: ContrastDetailsComponent}
    ])
  ],
})
export class ContrastDetailsModule { }
