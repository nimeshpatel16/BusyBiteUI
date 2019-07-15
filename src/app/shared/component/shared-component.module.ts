import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CompanyAutocompleteComponent } from './company-autocomplete/company-autocomplete.component';
import { PartyAutocompleteComponent } from './party-autocomplete/party-autocomplete.component';
import { AgentAutocompleteComponent } from './agent-autocomplete/agent-autocomplete.component';

@NgModule({
  declarations: [

  CompanyAutocompleteComponent,

  PartyAutocompleteComponent,

  AgentAutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
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
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  entryComponents: [],
  exports: [
    CompanyAutocompleteComponent,

    PartyAutocompleteComponent,

    AgentAutocompleteComponent
  ]
})
export class SharedComponentModule { }
