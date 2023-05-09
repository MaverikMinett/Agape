import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DatetimeControlComponent } from './datetime-control/datetime-control.component';

@NgModule({
  declarations: [
    DatetimeControlComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    MatDatepickerModule,
    MatInputModule
  ],
  exports: [
    DatetimeControlComponent
  ]
})
export class AgMatDatetimeControlModule {}
