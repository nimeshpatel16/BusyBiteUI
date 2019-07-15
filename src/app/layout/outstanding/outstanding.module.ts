import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutstandingRoutingModule } from './outstanding-routing.module';
import { OutStandingDetailsComponent } from './out-standing-details/out-standing-details.component';
import { OutStandingSummaryComponent } from './out-standing-summary/out-standing-summary.component';
import { MatDialogModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatCardModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatAutocompleteModule, MatSortModule, MatToolbarModule, MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [OutStandingSummaryComponent, OutStandingDetailsComponent],
  imports: [
    CommonModule,
    OutstandingRoutingModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    SharedComponentModule,
    MatSortModule,
    MatToolbarModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class OutstandingModule { }
