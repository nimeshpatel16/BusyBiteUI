import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PartyService } from 'src/app/services/party/party.service';
import { Company } from 'src/app/models/company/company.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Party } from 'src/app/models/party/party.model';

@Component({
  selector: 'app-party-autocomplete',
  templateUrl: './party-autocomplete.component.html',
  styleUrls: ['./party-autocomplete.component.scss']
})
export class PartyAutocompleteComponent implements OnInit {

  filteredUsers: Party[] = [];
  public usersForm: FormGroup;
  isLoading = false;
  forbiddenNames = '';
  IsValidProviderSelected = true;
  userInput = new FormControl();
  titleAlert = '';
  titleAlertValidProviderSelected = '';
  public isProviderRequired = false;
  @ViewChild('providerAuto') nameField: ElementRef;
  constructor(private fb: FormBuilder, private partyService: PartyService) { }
  IsValidField(): boolean {
      this.usersForm.controls['userInput'].markAsTouched({ 'onlySelf': true });
      this.markFormGroupTouched(this.usersForm);
      return this.usersForm.valid;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
          control.markAsTouched();

          if (control.controls) {
              this.markFormGroupTouched(control);
          }
      });
  }

  ngOnInit() {
      // this.isProviderRequired = true;
      if (this.isProviderRequired) {
          this.usersForm = this.fb.group({
              userInput: [null, [Validators.required]]
          });
      } else {
          this.usersForm = this.fb.group({
              userInput: this.userInput
          });

      }



      this.usersForm
          .get('userInput')
          .valueChanges
          .pipe(
              debounceTime(1000),
              tap(() => this.isLoading = true),

              switchMap(value => {
                  // debugger;
                  if (value.length >= 1) {
                      return this.partyService.getPartyName({ firstName: value })
                          .pipe(
                              finalize(() => this.isLoading = false),
                          );
                  } else {
                      this.isLoading = true;
                      debounceTime(1600);

                      // return of({});
                      return this.partyService.getFakePartyName({ firstName: value })
                          .pipe(
                              finalize(() => this.isLoading = false),
                          );

                  }

              }
              )
          )
          .subscribe(result => {
              this.filteredUsers = result as Party[];

          });

      if (this.IsValidProviderSelected === false) {

      }

  }

  displayFn(user: Party) {
      if (user) { return user.partyName; }
  }
public  removeValidators(form: FormGroup) {

      (<any>Object).values(form.controls).forEach(control => {
          control.markAsTouched();

          if (control.controls) {
              this.usersForm.get(control).clearValidators();
              this.usersForm.get(control).updateValueAndValidity();
          }
      });

  }
}

